import React from "react"
export default function Body() {
     
    const [meme , Setmeme] = React.useState({
        imageUrl : "http://i.imgflip.com/1bij.jpg",
        topText: "does not simply",
        bottomText: "Walk into Mordor"
    })

    const [allmemes, setAllMemes] = React.useState([])

    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    }, [])

    function handleText(event){
        const {value , name} = event.currentTarget
        Setmeme(prevValue => ({
            ...prevValue,
            [name] : value
        }))
    }


    function memeHandle(){
        const randomNumber = Math.floor(Math.random() * allmemes.length)
        const newimageURL = allmemes[randomNumber].url
        Setmeme(prevState => ({
            ...prevState,
            imageUrl: newimageURL
        }))
    }
    
    return (
        <main>
            <div className="form">
                <label>Top Text
                    <input
                        type="text"
                        placeholder="One does not simply"
                        name="topText"
                        onChange={handleText}
                        value={meme.topText}
                    />
                </label>

                <label>Bottom Text
                    <input
                        type="text"
                        placeholder="Walk into Mordor"
                        name="bottomText"
                        onChange={handleText}
                        value={meme.bottomText}
                    />
                </label>
                <button onClick={memeHandle}>Get a new meme image 🖼</button>
            </div>
            <div className="meme">
                <img src={meme.imageUrl} />
                <span className="top">{meme.topText}</span>
                <span className="bottom">{meme.bottomText}</span>
            </div>
        </main>
    )
}