

import { utilService } from "../../../services/util.service.js";
import { noteService } from "../services/note.service.js";
import { NoteTxt } from "./NoteTxt.jsx";
import { NoteImg } from "./NoteImg.jsx";
import { NoteVideo } from "./NoteVideo.jsx";
import { NoteTodos } from "./NoteTodos.jsx";



const { Link, Route, Switch } = ReactRouterDOM

export function DynamicCmp(props) {
    switch (props.type) {
        case 'note-txt':
            return <NoteTxt {...props} />
        case 'note-img':
            return <NoteImg {...props} />
        case 'note-todos':
            return <NoteTodos {...props} />
        case 'note-video':
            return <NoteVideo {...props} />
        default:
            return <React.Fragment></React.Fragment>
    }
}


export class NotePreview extends React.Component {
    state = {
        note: this.props.note,
        isHover: false,
        txt: ''
    }

    onRemoveNote = () => {
        noteService.removeNote(this.state.note.id);
        this.props.onLoadNotes();
    }

    onCopyNote = () => {
        noteService.copyNote(this.state.note.id);
        this.props.onLoadNotes();
    }

    handleMouseEnter = () => {
        this.setState({
            isHover: true,
        })
        // if (this.state.isPanelHover === false) {
        //     this.setState({
        //         isShowColorPalette: false,
        //     })
        // }
    }
    handleMouseLeave = () => {
        this.setState({
            isHover: false,
        })
    }



    render() {
        const { note, isHover } = this.state
        const btnAction = <div className="note-actions">
            <button>
                {/* onClick={this.togglePin}> */}
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABGklEQVRIie3UP0oDYRCG8Z+InXZmIb02VhZi5wGs7L2AJBewEJtU1t7AA+gJ7DxBNGAnaGOjRMFChLgWmWU/lmhikq30rXZnZp+X+cPyl9VCVhe8jRw3dZlkuKvLZAGHGIRBjls05wFfxnlAB+gEfC6drAUkxyv2Ip6hZ4pO0ivZRT8gPaxXao+U45qok/RKOsp5X2ClUruDD3ziPura4wwy5TiKeR8bLjhVE49RcxLftcbBR5m8YLOSX8JV5C+xOCk4VQPXAeljK8mdRvwh6qbWhnIHT4ad7Mf7O7Znga+iq9xDjme8xfPBvOBdw07SxZ/NAm9U4KtJvNjJ1L+H7+CF0usae++/hacmE997qqL9n+AzqVb4v0bqC6AyX4ICuG4RAAAAAElFTkSuQmCC" />
            </button>
            <button>
                {/* onClick={this.showColorPalette}> */}
                <img src="data:image/png;base64,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" />
            </button>
            <button>
                {/* onClick={this.onToggleEditNote} */}
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAD3klEQVR4nO3bSYgdRRzH8c/EoOigBlGRyIyJQka8RBSNCG5BcQNFcCFHD0YQj+LFo568ehLxJhqIEcUFJKLxIi6oBzUimMUlMYl7VNTRyXioPOip1/1eT3f18nB+UPC6u/7V/+/vVXdXL8WK/t+a6jqBhLoE9+AKnI2/sBuvYgf+7i61ZnUWXsAxLBaU/bi5qwSb1AbsVQyeLcfwYDdpNqM5HFAOPmvCTdlGis4BU7ga1+AcnJA8/WH9hCeF7jpOc3gTa6P1f+I5fCIcGluwPqrzldBz5osa34gPLc/ZVOVbTJeAz/vn9x7fltU0tuXU3VLU+Cb83hH8oGyqCH9eQcy04fPEM3kVT8HXHcMfwWkJ4Qd6NIr5aLBhdabSvZiJAn/AO9q5hv6IJ3A0Z1vRMb8P1wnH9SgdiZZPzqv0mqUufY4zxjTchur88wM9HcW+nVfps6jSw3WyTqQU8HPC1SEb/3hexT1Rpa01Ek+hFPCzhrkWcXFe5T4ZMAp+tmQbRfDPFwX0xYAm4fcJN0q56oMBTcIfEEaAheragA3y4fcbHs4WaQZf5rRxCBeNC+7SgM7h6c6AXsDTjQG9gad9A3oFT7sG9A6e9gzoJTztGNBbeJo3oNfwNGtA7+FpzoCJgKcZAyYGnvQGTBQ8aQ2YOHjSGTAKfl3JNlqHJ40B6+TD75Hmfj5+8THQpfgUP+ORCnmTs9MqBmyXDx8/bi9SFXh4L6q/sULutQ1YI7yTrwo/k5NDGXjCe8VszJ1lk15VtmIJ3YaTMsuLuAXflIidwS6cH60/iM34Ypm5lP7wI6UBd0fLHyiX+AzeMgx/GDeUbKOyUhmwBtdH67aXiBvAXxCtPyz887vrpzZaqQy43dLuT/hsZZQ6hyedAXdFy+8Lj7KL1At40hiQ1/0L377gQuGEF8MfFL5IaQ2epa/Hqyqv+++Ilmdxh9BTrjR8lm7lhJenFAYUdf9x0AO13u2zqmvA6Ya7P8GEy0rEV73OJ1NdA/K6/+Ul4ubxMh5S7quwxlTXgHjwM0oLeFcYHzyL72vuO4nqGDAldN9RmsdOAfol/FJjf42ojgGr8JvhD456D51VHQMWcD+ewql4w4RAZ1X3HPCiALwa/9RPp32lGAkumlB40t4OT6RWDOg6ga61YkDm90K0LR7i9lVTODFa92/Z4KwBh6Jtt1bNqGVtNjzJ4ruywdlxwC5clVm+Ea/jFf2dcrYeD0TrfpWZD7AcrcUfhp/LT1p5rAr8QFt7AFCnfGz8nKOxus9k9oSdOHO5sEWPqc49bsS1wqHRxrS5KjoqvBTdJkyRXdGKlqn/ABzpJgpNlpMuAAAAAElFTkSuQmCC" />
            </button>
            <button
                onClick={this.onCopyNote}>
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAB4klEQVR4nO2bQW7CMBBFX6uKBfuiHgaOxrb0XsC2i7KAA0AP0UXbRSIlCg6xE3tsT/wkK8Ikk5lP4smXAhQKU1kCW+AC/AB/AccN+AAWIpVZsAI+CVu0aewkihtiBZyoErrQJBeSNc2VEJVX4IsqmTPwhowACJ6nF1PxMBMB+oqHGQjwqHhQLsBQ8aBYAJviQakAtsWDQgGWNA85J6q+/wh1AmxpHnKGit/U+15DJ4WgAOfWyWzH+4N42XkGlySvdfF9J8zSM/i61LL1DD4SzdozTA2QvWeYEkCFZxgbQI1nGBNAlWdwDaDOM7gEUOkZbAOo9Qy2AdR6BtsAvj2DL8QE8OkZfCImgNQ97YpVXs8CiSRNESB2ArGRFOCIe7c4DBzf/n4UkgL8TjzGdPyYmNaULjAHigCxE4hN6l3A+6rfJfUuECKGNd1V9Mj9L3A07JcKVnk9DQRo79P93J4bihUDU753lEXQYd8DsDfMqcX3k6CPLuDSDZJ7EvS5got0g9l7ge96u/aSTobscLsvU2NyXgsqEW7MVIDkTuRIcl0gSUII0OcZYsyJ0L3UTJdejLlyC9jwEiDmgXvlY82JULpAzhQBPMRI0TNs6q3I3+tcPYPkkHgTxdkzSAzJN1EKWfMPkZ9HkeFAqoUAAAAASUVORK5CYII=" />
            </button>
            <button
                onClick={this.onRemoveNote} >
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAACYElEQVRoge2ZzW7UMBDHf93DViAoB8ou9CEQDwFSTyBaISTU10DihsSXAIkeeBU49RkQgisLFxCUQsuXtuq2VF0OjuVpmmTHjr27RflJVqx4Mv47M7GdBBoaGmLTBR4Ab4F+Vt4A94HOBHWpWAZ+A8OS8gtYmpi6ESwD+5SLt2UfuD4hjaV0gZ84ke+AG8A8cA64CfRE+xZTlk73cOJ6GNF5OsB7YXd3bOoUvMYJu1VhtyLsXqUU9AjYYXQ+j6vsAA+LhM6UnPsDnAodfSL6wOn8yVaB4RB4DgxSK/JggNEUxDVcKF/EUlTBS9Hf1VHGRRHI81XUzweK8uFCSd+FaAawXuI8FfImrZdaedAGDjAh/Ytu0KG0sj6GWZ/tWI43cXmZcgXtin6+ay7Q3k1tGj3DzNlPPdssMn1G5r8Pa7g7s1hht5vZ7Hq2WRZFP2saYdoIaGeidu6obbMsiLrqAY6dQnXxnoFiR6AuXmsATF8EpO8mhSRTGwEtc7jpbbvCTu7hfdos28LmyNa5Ln2F8zoDOCPa+1pRPvsaOSukSKOg9PEZQOrn4NgPIGgbHZpCKRYz70UMpisCxz6Fkg9Ak0KD3FHbBuZlxrKhFRU7AquYOXzVsy3vM+oqbOngFprNBP5/CP9F31Zr0wL2cC/csxF9zxL44cAnhQ6Ab1l9hrgP8gLuM+dG1pcK308kH0T9sue1VVwR9V5Ev0e4w+GfFEvAiRr+TmL+7Mj8v11TYyVzwCcO7yxjlo8k2EbnuQR8SSD+M3AxtXjLPPAEk692Zgope5j/aY+Bs+MS39DwP/EPuVoXL8eoVd8AAAAASUVORK5CYII=" />
            </button>
        </div>;

        if (!note) return <h1>Loading..</h1>
        return (
            <section className="note-preview" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}
                style={{ backgroundColor: note.style }}>
                <Link className="clean-link"
                // to={`/note/edit/${note.id}`}
                >
                    <DynamicCmp type={note.type} note={note} />

                </Link>

                <div style={{ visibility: isHover ? 'visible' : 'hidden' }}>
                    {btnAction}
                </div>


            </section>
        )
    }
}