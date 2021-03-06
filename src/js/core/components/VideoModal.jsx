import React from "react"

export default class VideoModal extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isVisible: false
        }

        this.onToggle = () => this.setState({isVisible: !this.state.isVisible})
    }

    render() {
        let url, video
        switch (this.props.type) {
            case "vimeo":
                url = `//player.vimeo.com/video/${this.props.id}?title=0&byline=0&portrait=0&autoplay=1`
                break
            case "youtube":
                url = `//www.youtube.com/embed/${this.props.id}?autoplay=1&modestbranding=1&rel=0&showinfo=0"`
                break
        }

        if (this.state.isVisible) {
            video = (
                <iframe src={url} frameBorder="0" allowFullScreen="" />
            )
        }

        return (
            <div className="video-modal" style={{display: this.state.isVisible ? "block" : "none"}}>
                <div className="video-modal__overlay" onClick={this.onToggle}></div>
                <div className="container">
                    <div id="video-modal__box" className="video-modal__box">
                        <span className="video-modal__close" onClick={this.onToggle}></span>
                        {video}
                    </div>
                </div>
            </div>
        )
    }
}