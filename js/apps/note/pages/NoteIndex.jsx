import { noteService } from '../services/note.service.js'
// import { eventBusService } from '../../../services/event-bus.service.js'

import { NoteList } from '../cmps/NoteList.jsx'
import { NoteFilter } from '../cmps/NoteFilter.jsx'
// import { NoteEdit } from '../cmps/NoteEdit.jsx'

const { Route } = ReactRouterDOM

export class NoteIndex extends React.Component {

    state = {
        notes: null,
        filterBy: null,
        noteType: 'note-txt',
    }

    inputRef = React.createRef()

    componentDidMount() {
        this.loadNotes()
        // this.inputRef.current.focus()
    }

    get ctgSearchParam() {
        const urlSearchParams = new URLSearchParams(this.props.location.search)
        return urlSearchParams.get('ctg')
    }

    get notesToDisplay() {
        const { notes } = this.state
        const ctg = this.ctgSearchParam
        return notes.filter(note => !ctg || note.ctg === ctg)
    }

    loadNotes = () => {
        const { filterBy } = this.state
        noteService.query(filterBy).then(notes => {
            this.setState({ notes })
        })

    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadnotes)
    }

    dynamicPlaceHolder = () => {
        const { noteType } = this.state
        switch (noteType) {
            case 'note-txt':
                return 'Take a note...'
            case 'note-img':
                return 'Enter image URL...'
            case 'note-video':
                return 'Enter video URL...'
            case 'note-todos':
                return 'Enter comma-separated Todos...'
        }
    }

    handleInputSumbit = (ev) => {
        if (!ev.target.value) return
        if (ev.keyCode === 13) {
            const note = this.createNewNote(ev.target.value)
            noteService.saveNote(note).then(this.loadNotes)
            ev.target.value = ''
        }

    }

    createNewNote(value) {
        const { noteType } = this.state
        const note = {
            type: noteType,
            isPinned: false,
            title: '',
            style: '',
        }
        switch (noteType) {
            case 'note-txt':
                note.txt = value
                break;
            case 'note-img':
                note.url = value
                break;
            case 'note-video':
                let videoId = value.replace('https://www.youtube.com/watch?v=', '')
                note.url = `https://www.youtube.com/embed/${videoId}`
                // console.log(note.url);
                break;
            case 'note-todos':
                const listTodo = value.split(',');
                // console.log(listTodo);
                const todos = listTodo.map(todo => {
                    return { txt: todo, isDone: false }
                })
                note.todos = todos

                break;
        }
        return note
    }

    toggleType = (type) => {
        // console.log(ev);
        this.setState({ noteType: type })
    }



    render() {
        const { notes, noteType } = this.state
        if (!notes) return <h1>Loading notes..</h1>
        const placeHolder = this.dynamicPlaceHolder()

        return (
            <section className="note-index">
                <NoteFilter onSetFilter={this.onSetFilter} />
                <div className='add-note'>
                    <input ref={this.inputRef} name={noteType} placeholder={placeHolder} onKeyDown={this.handleInputSumbit} />
                    <div className='btn-actions'>
                        <button value='note-txt' className='new-txt' title='New text note' onClick={() => this.toggleType('note-txt')}>
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAgElEQVRIie2USw6AIAxEn8bLEQ+lZxXvoSs2CqWfGDa+pKvCDAOk8GNkBU7gclYGkmSQA+KlDsmgLPLy2j8HxFQsnb42zdRqDE/QPJmW4Qlqb2BKNTxB+A16BhKqL/zFFe1S0zIqanNo027yGHTFIwYqcfCNa/HOnySjiUn8p8oNUehWAoVn3B0AAAAASUVORK5CYII=" />
                        </button>
                        <button value='note-todos' className='new-list' title='New list' onClick={() => this.toggleType('note-todos')}><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAA7klEQVRoge3WMUrEUBQF0AOigshUFrMDsbZzA2I9lbU7sLHQ1g3YuQPXoK3YzQKstHEDNoKCY5EUY2GUxPi/cA88SD75cB9pLhERX9jEYekQv+EKC5yWDjLEsWaJZ+wUztLbHl7xjlnhLL1N8aT5G+eFs/zYPjaW3ldxq1niGisddxd/OJ0O8IY7bLVnF+3Fx6Wz6hfZxkP74T1O2ucX7H53uTZTzH3e/qhoogEmuNEscVk4y2BrOMN66SAR/0zab03SfmuR9jvidEr7rVHab63SfiP6SfutSdpvLdJ+R5xOab81SvutVdpvRMRoPgBG2PwcrWSIvQAAAABJRU5ErkJggg==" /> </button>
                        <button value='note-img' className='new-img' title='New note with image' onClick={() => this.toggleType('note-img')}><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAACEUlEQVRoge2YP0gcQRSHv/MMCCc2gaQRQQmJhUICBq1iI2IkcJUErCNnIXaWQSwtrCzSpAuCCUEQLPxXxFas5IoQUiXBIm2EO0HvUswJ69y4M7v3bneV+eDBze2bt78fM7s7M+DxeDweT3xyIddGgbdAb0JabPwGPgPHUTqtAPUMRg1YdjUxnQHBtpjSRXcYjMy5Ok6RJo2dhqQBrb0NfG+LHHcGgWKg/cSlU5mbwzgjrysyM9zUVNYTTFPrTuKN3MIDYAIYEq5rRdJIHjhoxCmwKFjbiqSRYWC88TsHLAjWtiJp5AyoBto/BWtbkTTyF/WaPAK+ACXB2lZMH8RW2GlE4qT5+g1beUcmLSNvgE+SBaWnlgsjwCZQAL4BHyWKJj0i/ahnqNBorwPPJQpLGfkAjFlyHgK7wOPAf12o0eluVYCEkUVgHjgEXt2S04XaDjw1XHuG0PTSibKMHwMuArnnNJvJARvYd33vQu5jXca3YuQR8McgSDez5mCiDlSAF0kbyQP7IaKuzZQcTVzHD6AnSSOrDqL+AZcRjdRR0zCykTgPexFYcsjrRo1cVGaJcQAS54NYRR3ctZNK1A5xjOzF6NN2/J49a5im1pXWLtJ8aJc0w1pb12hki/TPdm3x1cXI6wwItcWkixFQR/e1DAjWowa8NwkO226+RH0v+lzdt5lfqCX/SdpCPB6Px3P/+A9CE2ELEdgoDAAAAABJRU5ErkJggg==" /></button>
                        <button value='note-video' className='new-video' title='New note with video' onClick={() => this.toggleType('note-video')}><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAABoElEQVRoge2ZTU7CQBTHf36knsAtsHNv9AKAbvQUeghvonAND+FCL2BiIiIrjTHoSgkEF630Wdvp0Fpmat4veUk7ffPyf0M7Hw9QFEVRKqAF9IERMAXmjmwaaegBTVvxh8C7Q9FZ9gZ088S3PBUvk2iYEugL53ugDQR5WVdIAHSAgdB1YeowEo7tqtUtQYdY19DkKD/YADgGPiI7En6rbg+ErqkUvJ5IYENcT4A9YCuyffFs1e2TDI1sYuYG+Iyurz1o/8Va4n5ueOaaVG3JV6h2aAIJToFn4AqLVbMK5KpXhJdEjEtg52+k2Wkrm0Da8j8hXOG3C8ZcSlsVCXzbK3BGOLeXjV3OybJ/lt0CuyVjl3Oy7G+yu5KxF7iaRosOkFVgfYUyrLYfca2m0dovZCfAE9VsJVK16XbaNf8+AV8O9YUT8OVQn0nyUD8jPvUH+HOol8W1WUoeCx6JpyqfCltdYl0PJseecBxEHV2XFg/4WVo8N3VoEhZQbbfFq7YxOcVdCEfdxyTGhDVSKxqEP9UQ939wDCMtuSOvKIqiLM0XMlbWqV44zcYAAAAASUVORK5CYII=" /></button>
                    </div>
                </div>
                <NoteList notes={this.notesToDisplay} onLoadNotes={this.loadNotes} />

            </section>
        )
    }
}
