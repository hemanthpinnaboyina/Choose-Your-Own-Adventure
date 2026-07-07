import {useState, useEffect} from 'react';

function StoryGame({story, onNewStory}) {
    const [currentNodeId, setCurrentNodeId] = useState(null);
    const [currentNode, setCurrentNode] = useState(null);
    const [options, setOptions] = useState([]);
    const [isEnding, setIsEnding] = useState(false);
    const [isWinningEnding, setIsWinningEnding] = useState(false);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        if (story && story.root_node) {
            const rootNodeId = story.root_node.id;
            setCurrentNodeId(rootNodeId);
            setHistory([]); // Reset history on new story
        }
    }, [story]);

    useEffect(() => {
        if (currentNodeId && story && story.all_nodes) {
            const node = story.all_nodes[currentNodeId];

            setCurrentNode(node);
            setIsEnding(node.is_ending);
            setIsWinningEnding(node.is_winning_ending); // Typo fixed from is_winning_endig to is_winning_ending

            if (!node.is_ending && node.options && node.options.length > 0) {
                setOptions(node.options);
            } else {
                setOptions([]);
            }
        }
    }, [currentNodeId, story]);

    const chooseOption = (optionId, optionText) => {
        if (currentNode) {
            setHistory(prev => [...prev, {
                nodeId: currentNode.id,
                contentPreview: currentNode.content.length > 80 ? currentNode.content.substring(0, 80) + "..." : currentNode.content,
                choiceText: optionText
            }]);
        }
        setCurrentNodeId(optionId);
    };

    const revertToHistory = (index) => {
        const targetNodeId = history[index].nodeId;
        setCurrentNodeId(targetNodeId);
        setHistory(history.slice(0, index)); // Revert history array to state before that choice
    };

    const restartStory = () => {
        if (story && story.root_node) {
            setCurrentNodeId(story.root_node.id);
            setHistory([]);
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
                        <p>{currentNode.content}</p>

                        {/* Adventure Progression History (Time-Travel Timeline) */}
                        {history.length > 0 && (
                            <div className="history-timeline">
                                <h4>Chronicle history (Click to rewind time)</h4>
                                <div className="history-list">
                                    {history.map((item, index) => (
                                        <div 
                                            key={index} 
                                            className="history-item" 
                                            onClick={() => revertToHistory(index)}
                                            title="Rewind destiny to this path"
                                            style={{cursor: 'pointer'}}
                                        >
                                            <span className="history-choice-badge">
                                                Choice {index + 1}: {item.choiceText}
                                            </span>
                                            <span className="history-text">
                                                {item.contentPreview} ↩
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {isEnding ? (
                            <div className={`story-ending ${isWinningEnding ? 'story-ending-winning' : 'story-ending-normal'}`}>
                                <h3>{isWinningEnding ? "🌟 Destiny Fulfilled" : "💀 The End"}</h3>
                                <p>{isWinningEnding ? "Congratulations! You have reached a triumphant victory." : "Your adventure has reached its final pages."}</p>
                            </div>
                        ) : (
                            <div className="story-options">
                                <h3>What will you do?</h3>
                                <div className="options-grid">
                                    {options.map((option, index) => {
                                        const badge = String.fromCharCode(65 + index); // A, B, C, D...
                                        return (
                                            <button
                                                key={index}
                                                onClick={() => chooseOption(option.node_id, option.text)}
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
                    <button onClick={restartStory} className="btn btn-secondary reset-btn">
                        Restart Story
                    </button>
                    {onNewStory && (
                        <button onClick={onNewStory} className="btn btn-primary new-story-btn">
                            New Story
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default StoryGame;