// Footer component
import '../css/newsletter.css'

function NewsLetter() {
    return (
        <>
        <section className="newsLetter">
            <div className="newsLetter-content">
                <div className="text-heading text-center">
                    <h2 className="text-3xl font-bold">Subscribe to our Newsletter</h2>
                </div>
                <form action="#">
                    <div className="input-group-subscribe-button flex justify-center items-center gap-4">
                        <div className="input-group">
                            <input id="newsLetter" type="email" placeholder="Enter your email" required />
                        </div>
                        <div className="btn-wrapper">
                            <button className="text-base font-medium text-white cursor-pointer" type="submit">Subscribe now</button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
        </>
    )
}

export default NewsLetter