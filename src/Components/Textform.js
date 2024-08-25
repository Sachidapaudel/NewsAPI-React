import React, { useState } from 'react';

export default function TextForm(props) {

    const handleUpClick = () => {
        let newText = text.toUpperCase();
        setText(newText);
        props.showAlert("Converted To Uppercase", "success");
    }

    const handleLowClick = () => {
        let newText = text.toLowerCase();
        setText(newText);
        props.showAlert("Converted To Lowercase", "success");
    }

    const handleRemovePunctuationClick = () => {
        let newText = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
        setText(newText);
        props.showAlert("Punctuation Removed", "success");
    }

    const handleCopy = () => {
        var textElement = document.getElementById("myBox");
        textElement.select();
        textElement.setSelectionRange(0, 9999); // For mobile devices
        navigator.clipboard.writeText(textElement.value);
        document.getSelection().removeAllRanges(); // Deselect text after copying
        props.showAlert("Text Copied To Clipboard", "success");
    }

    const clearTextOnClick = () => {
        setText('');
        props.showAlert("Text Cleared", "success");
    }

    const handleOnChange = (event) => {
        setText(event.target.value);
    }

    const [text, setText] = useState("");

    return (
        <>
            <div className='container' style={{ color: props.mode === 'dark' ? 'white' : '#042743' }}>
                <h2 className='mb-2'>{props.heading}</h2>
                <div className="my-3">
                    <textarea 
                        className="form-control" 
                        value={text} 
                        onChange={handleOnChange} 
                        style={{ backgroundColor: props.mode === 'dark' ? 'grey' : 'white', color: props.mode === 'dark' ? 'white' : '#042743' }} 
                        id="myBox" 
                        rows="8">
                    </textarea>
                </div>
                <button disabled={text.length === 0} className='btn btn-primary mx-1 my-1' onClick={handleUpClick}>Convert to Uppercase</button>
                <button disabled={text.length === 0} className='btn btn-primary mx-1 my-1' onClick={handleLowClick}>Convert to Lowercase</button>
                <button disabled={text.length === 0} className='btn btn-primary mx-1 my-1' onClick={handleRemovePunctuationClick}>Remove Punctuation</button>
                <button disabled={text.length === 0} className='btn btn-primary mx-1 my-1' onClick={handleCopy}>Copy Text</button>
                <button disabled={text.length === 0} className='btn btn-primary mx-1 my-1' onClick={clearTextOnClick}>Clear Text</button>
            </div>

            <div className='container my-3' style={{ color: props.mode === 'dark' ? 'white' : '#042743' }}>
                <h1>Your Text Summary</h1>
                <p>
                    {
                        text.trim().split(/\s+/).filter((element) => {
                            return element.length !== 0;
                        }).length
                    } words and {text.trim().length} characters
                </p>
                <p>
                    {0.008 * text.trim().split(/\s+/).filter((element) => {
                        return element.length !== 0;
                    }).length} minutes read
                </p>
                <h1>Preview</h1>
                <p>{text.length > 0 ? text : "Nothing to preview"}</p>
            </div>
        </>
    )
}
