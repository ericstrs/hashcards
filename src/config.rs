use std::fs::read_to_string;
use std::path::Path;

use serde::Deserialize;

use crate::error::ErrorReport;
use crate::error::Fallible;

const CONFIG_FILENAME: &str = "hashcards.toml";

#[derive(Debug, Default, Deserialize)]
#[serde(default)]
pub struct Config {
    pub drill: DrillConfig,
}

#[derive(Debug, Default, Deserialize)]
#[serde(default, rename_all = "kebab-case")]
pub struct DrillConfig {
    pub card_limit: Option<usize>,
    pub new_card_limit: Option<usize>,
    pub host: Option<String>,
    pub port: Option<u16>,
    pub open_browser: Option<bool>,
    pub answer_controls: Option<String>,
    pub bury_siblings: Option<bool>,
}

pub fn load_config(directory: &Path) -> Fallible<Config> {
    let path = directory.join(CONFIG_FILENAME);
    if !path.exists() {
        return Ok(Config::default());
    }
    let content = read_to_string(&path)?;
    let config: Config = toml::from_str(&content)
        .map_err(|e| ErrorReport::new(format!("failed to parse {}: {}", CONFIG_FILENAME, e)))?;
    Ok(config)
}
