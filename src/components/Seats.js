
export default function Seats(props){
    const {session} = props;

    const seatsUrl = "https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${session.id}/seats";

    return (
        <>
            seatsUrl
        </>
    );
}