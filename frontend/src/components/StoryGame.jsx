import {useState, useEffect} from 'react';

function StoryGame({story, onNewStory}) {
    const [currentNodeId, setCurrentNodeId] = useState(null);
    const [currentNode, setCurrentNode] = useState(null);
    const [options, setOptions] = useState([]);
    const [isEnding, setIsEnding] = useState(false);
    const [isWinningEnding, setIsWinningEnding] = useState(false);

    useEffect(() => {
        if (story && story.root_node) {
            const rootNodeId = story.root_node.id;
            setCurrentNodeId(rootNodeId);
        }
    }, [story]);

    useEffect(() => {
        if (currentNodeId && story && story.all_nodes) {
            const node = story.all_nodes[currentNodeId];

            setCurrentNode(node);
            setIsEnding(node.is_ending);
            setIsWinningEnding(node.is_winning_ending);

            if (!node.is_ending && node.options && node.options.length > 0) {
                setOptions(node.options);
            } else {
                setOptions([]);
            }
        }
    }, [currentNodeId, story]);

    const chooseOption = (optionId) => {
        setCurrentNodeId(optionId);
    };

    const restartStory = () => {
        if (story && story.root_node) {
            setCurrentNodeId(story.root_node.id);
        }
    };

    return (
        <div className="story-game">
            <header className="story-header">
                <h2>{story.title}</h2>
            </header>

            <div className="story-content">
                {currentNode && (
                    <div className="story-node">
                        <p className="narrative-text">{currentNode.content}</p>

                        {isEnding ? (
                            <div className={`story-ending ${isWinningEnding ? 'story-ending-winning' : 'story-ending-normal'}`}>
                                <h3>{isWinningEnding ? "✦ Mission Accomplished" : "✦ The End"}</h3>
                                <p>{isWinningEnding ? "Congratulations! You have reached a successful conclusion." : "Your adventure has reached its final pages."}</p>
                            </div>
                        ) : (
                            <div className="story-options">
                                <h3>Choose your next action:</h3>
                                <div className="options-grid">
                                    {options.map((option, index) => {
                                        const badge = String.fromCharCode(65 + index); // A, B, C...
                                        return (
                                            <button
                                                key={index}
                                                onClick={() => chooseOption(option.node_id)}
                                                className="option-btn"
                                            >
                                                <span className="option-badge">{badge}</span>
                                                <span className="option-text">{option.text}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                <div className="story-controls">
                    <button onClick={restartStory} className="btn btn-secondary btn-sm reset-btn">
                        Restart Story
                    </button>
                    {onNewStory && (
                        <button onClick={onNewStory} className="btn btn-primary btn-sm new-story-btn">
                            New Story
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default StoryGame;