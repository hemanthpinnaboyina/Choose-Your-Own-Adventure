import {useState} from "react"

const PRESETS = [
    {
        id: "cosmic",
        icon: "🌌",
        title: "Cosmic Odyssey",
        desc: "Space exploration, rogue black holes, and alien civilizations",
        prompt: "Space exploration, rogue black holes, and alien civilizations"
    },
    {
        id: "dungeon",
        icon: "🏰",
        title: "Dungeon Explorer",
        desc: "Chasing ancient treasure inside a cursed labyrinth with dragons",
        prompt: "Chasing ancient treasure inside a cursed labyrinth guarded by dragons"
    },
    {
        id: "cyberpunk",
        icon: "🕵️",
        title: "Cyberpunk Noir",
        desc: "A cybernetic detective finding a hacker in a neon metropolis",
        prompt: "A cybernetic detective hunting a rogue hacker inside a high-tech neon metropolis"
    },
    {
        id: "pirates",
        icon: "🏴‍☠️",
        title: "Pirate Voyages",
        desc: "Sailing uncharted waters, krakens, and the Isle of Gold",
        prompt: "Sailing uncharted waters, fighting kraken threats, and searching for the Isle of Gold"
    },
    {
        id: "forest",
        icon: "🌲",
        title: "Whispering Woods",
        desc: "A traveler discovering magic runes in an enchanted forest",
        prompt: "A lost traveler discovering magic spirits and ancient runes in an enchanted forest"
    }
];

function ThemeInput({onSubmit}){
    const [theme, setTheme] = useState("");
    const [error, setError] = useState("");
    const [activePreset, setActivePreset] = useState("");

    const handlePresetClick = (preset) => {
        setTheme(preset.prompt);
        setActivePreset(preset.id);
        setError("");
    };

    const handleTextareaChange = (e) => {
        setTheme(e.target.value);
        setActivePreset(""); // reset active if user types custom text
        if (e.target.value.trim()) {
            setError("");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!theme.trim()) {
            setError("Please choose a preset or enter a custom theme below");
            return;
        }
        onSubmit(theme.trim());
    }

    return (
        <div className="theme-input-container">
            <h2>Generate Your Adventure</h2>
            <p className="subtitle">Where AI weaves your custom interactive saga</p>

            <div className="preset-section">
                <h3 className="preset-section-title">Select a Starting Realm</h3>
                <div className="preset-grid">
                    {PRESETS.map((preset) => (
                        <div
                            key={preset.id}
                            className={`preset-card ${activePreset === preset.id ? 'active' : ''}`}
                            onClick={() => handlePresetClick(preset)}
                            onDoubleClick={() => onSubmit(preset.prompt)}
                        >
                            <div className="preset-icon">{preset.icon}</div>
                            <div className="preset-details">
                                <span className="preset-title">{preset.title}</span>
                                <span className="preset-desc">{preset.desc}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="prompt-box-wrapper">
                    <label htmlFor="custom-theme">Or craft your own destiny:</label>
                    <div className="textarea-container">
                        <textarea
                            id="custom-theme"
                            value={theme}
                            onChange={handleTextareaChange}
                            placeholder="Describe your setting (e.g. A wizard searching for their lost spellbook in a floating sky-city...)"
                            className={`custom-textarea ${error ? 'error' : ''}`}
                        />
                        {error && <p className="error-text">{error}</p>}
                    </div>
                </div>
                <button type="submit" className="btn btn-primary generate-btn">
                    Launch Adventure
                </button>
            </form>
        </div>
    );
}

export default ThemeInput;