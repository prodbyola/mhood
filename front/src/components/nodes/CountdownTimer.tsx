import { useEffect } from "react";

export default function CountdownTimer(props: {date: Date}){
    const date = props.date.toISOString()

    useEffect(() => {
        // Update the count down every 1 second
        const countdown = setInterval(() => {
            const countDownDate = new Date(date).getTime();
            // Get today's date and time
            const now = new Date().getTime();

            // Find the distance between now and the count down date
            const distance = countDownDate - now;

            // Time calculations for days, hours, minutes and seconds
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            const dayNode = document.getElementById('day-count') as HTMLElement;
            const hourNode = document.getElementById('hour-count') as HTMLElement;
            const minNode = document.getElementById('minute-count') as HTMLElement;
            const secNode = document.getElementById('second-count') as HTMLElement;

            // Display the result in the element with id="demo"
            dayNode.innerHTML = days.toString();
            hourNode.innerHTML = hours.toString();
            minNode.innerHTML = minutes.toString();
            secNode.innerHTML = seconds.toString();

            // If the count down is finished, write some text
            if (distance < 0) {
            clearInterval(countdown);
            }
        }, 1000);
    })

    return (
        <div className="countdown-data">
            <div className="time-data">
                <div id="day-count" className="time-count">01</div>
                <div className="time-label">Days</div>
            </div>
            <div className="time-separator">:</div>
            <div className="time-data">
                <div id="hour-count" className="time-count">23</div>
                <div className="time-label">Hour</div>
            </div>
            <div className="time-separator">:</div>
            <div className="time-data">
                <div id="minute-count" className="time-count">59</div>
                <div className="time-label">Minutes</div>
            </div>
            <div className="time-separator">:</div>
            <div className="time-data">
                <div id="second-count" className="time-count">00</div>
                <div className="time-label">Seconds</div>
            </div>
        </div>
    )
}