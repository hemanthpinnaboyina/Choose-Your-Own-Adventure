import {useState, useEffect} from "react";

const NARRATIVE_MESSAGES = [
    "Consulting the ancient scrolls of fate...",
    "Drawing alternate universes in the stars...",
    "Summoning legendary beasts and galactic fleets...",
    "Carving choices in the timeline matrix...",
    "Polishing the treasure hoards...",
    "Assembling your companion avatars...",
    "Drafting mysterious dialogue options...",
    "Weaving branching paths of glory and doom...",
    "Etching final endings in the sands of time..."
];

function LoadingStatus({theme}){
    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((prev) => (prev + 1) % NARRATIVE_MESSAGES.length);
        }, 2200);

        return () => clearInterval(interval);
    }, []);

    // Format theme if it's long, or provide a default subtext
    const displayTheme = theme ? `themed around "${theme.length > 30 ? theme.substring(0, 30) + '...' : theme}"` : "";

    return (
        <div className="loading-container">
            <h2>Chronicle in Selection</h2>
            <p className="loading-subtext">Generating your custom interactive story {displayTheme}</p>

            <div className="loading-animation">
                <div className="spinner-outer"></div>
                <div className="spinner-inner"></div>
            </div>

            <p className="loading-info">
                {NARRATIVE_MESSAGES[messageIndex]}
            </p>
            <p style={{color: "var(--text-subtle)", fontSize: "0.85rem"}}>
                This may take a moment while the AI drafts the narrative branches.
            </p>
        </div>
    );
}

export default LoadingStatus;