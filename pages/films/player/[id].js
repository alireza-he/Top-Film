import VideoPlayer from "../../../components/video-player";


const PlayerPage = ({id}) => {
    return (
        <div>
            <VideoPlayer/>
        </div>
    )
}

export const getServerSideProps = (context) => {
    const id = context.params.id

    return {
        props: {
            id,
            customize: true
        }
    }
}

export default PlayerPage