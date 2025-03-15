import Modal from "../Modal/Modal";

interface Props {
    setShow: (arg: boolean) => void
}

export default function AddExperience( {setShow} : Props ) {

    return ( <Modal noOverlayClickOff={true} setShow={setShow} title="Add Experience">

        <form className='flex flex-col'>

            <label htmlFor="title" className="font-semibold mb-1">Experience Title</label>
            <input name="title" type="text" placeholder="Marketing Internship"/>

            <label htmlFor="description" className="font-semibold mb-1 mt-3">Description</label>
            <textarea name="description" placeholder="I created multiple social media posts"/>

            <div className="grid grid-cols-2 gap-2">
                <div className='flex flex-col'>
                    <label htmlFor="date_start" className="font-semibold mb-1 mt-3">Start Date</label>
                    <input type='date' name="date_start" className="text-[white_!important]" />
                </div>

                <div className='flex flex-col'>
                    <label htmlFor="date_end" className="font-semibold mb-1 mt-3">End Date</label>
                    <input type='date' name="date_end" className="text-[white_!important]" />
                </div>
            </div>
            <p className="italics grey mt-2">If the position is current, leave the end date empty</p>

            <button className="button red mt-3"> Add </button>

        </form>

    </Modal> )
}