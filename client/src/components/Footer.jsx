
export default function Footer() {
    return (
        <footer>
			<section className="informations-footer">
				<article>
                    <i className="fa-solid fa-mobile-screen-button"></i>
                    <h4>
                        <a href="tel:+33781460522">Tél: 07 81 46 05 22</a>
                    </h4>
				</article>
				<article>
                <i className="fa-solid fa-location-dot"></i>
					<address>7 BD DE LA PLAGE, 33510 ANDERNOS-LES-BAINS</address>
				</article>
				<article>
					<i className="fa-brands fa-instagram"></i>
					<h4>
                    <a href="https://www.instagram.com/">SUIVEZ-NOUS</a>
                    </h4>
				</article>
			</section>
			<small>
                <a href="/">© 2023 Rossignol Paysage </a> <a href="/legal">| Mentions légales |</a> <a href="/connexion">Connexion</a>
			</small>   
        </footer>
    )
}