use serde_json::{json, Value};
use std::{fs, io, path::PathBuf};

fn data_dir() -> io::Result<PathBuf> {
    let mut dir = dirs::data_dir()
        .or_else(|| dirs::home_dir().map(|home| home.join(".keeep")))
        .ok_or_else(|| io::Error::new(io::ErrorKind::NotFound, "No data directory found"))?;
    dir.push("Keeep");
    fs::create_dir_all(&dir)?;
    Ok(dir)
}

fn data_file() -> io::Result<PathBuf> {
    Ok(data_dir()?.join("budget.json"))
}

#[tauri::command]
fn load_budget_data() -> Result<Value, String> {
    let path = data_file().map_err(|e| e.to_string())?;
    if !path.exists() {
        return Ok(json!({}));
    }
    let raw = fs::read_to_string(path).map_err(|e| e.to_string())?;
    serde_json::from_str(&raw).map_err(|e| e.to_string())
}

#[tauri::command]
fn save_budget_data(data: Value) -> Result<(), String> {
    let path = data_file().map_err(|e| e.to_string())?;
    let tmp = path.with_extension("json.tmp");
    let raw = serde_json::to_string_pretty(&data).map_err(|e| e.to_string())?;
    fs::write(&tmp, raw).map_err(|e| e.to_string())?;
    fs::rename(&tmp, &path).map_err(|e| e.to_string())?;
    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .invoke_handler(tauri::generate_handler![load_budget_data, save_budget_data])
        .run(tauri::generate_context!())
        .expect("error while running Keeep");
}
