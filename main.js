const btn_inici = document.getElementById('btn-inici');
const groc = document.getElementById('groc');
const blau = document.getElementById('blau');
const vermell = document.getElementById('vermell');
const verd = document.getElementById('verd');

const NIVELL_FINAL = 20

class Joc{
	constructor(){
		this.iniciantJoc()
		this.sequenciaNumeros()
		setTimeout(()=>this.seguentNivel(), 1000)
	}

	iniciantJoc(){
		this.colorEscollit = this.colorEscollit.bind(this)
		this.canvis_btn_inici()
		this.colors = {groc, blau, vermell, verd}
		this.nivel = 1
	}

	canvis_btn_inici(){
		if(btn_inici.classList.contains('amagar')){
			btn_inici.classList.remove('amagar')
		}else{
			btn_inici.classList.add('amagar')
		}
	}

	transformarNumerosAColors(numero){
		switch(numero){
			case 0:
				return "groc"
			case 1:
				return "blau"
			case 2:
				return "vermell"
			case 3:
				return "verd"
		}
	}

	transformarColorsANumeros(color){
		switch(color){
			case "groc":
				return 0
			case "blau":
				return 1
			case "vermell":
				return 2
			case "verd":
				return 3
		}
	}
	sequenciaNumeros(){
		this.sequencia = new Array(NIVELL_FINAL).fill(0).map((numero)=>{
			return Math.floor(Math.random()*4)
		})
	}

	seguentNivel(){
		this.subnivell = 0
		this.iluminarSecuenciaNumeros()
		this.capturarEvents()
	}

	iluminarSecuenciaNumeros(){
		for(let i=0; i<this.nivel; i++){
			const color = this.transformarNumerosAColors(this.sequencia[i])
			setTimeout(()=>this.iluminarColors(color),800*i)
		}
	}

	iluminarColors(color){
		this.colors[color].classList.add('tenue')
		setTimeout(()=>this.apagarColors(color),300)
	}

	apagarColors(color){
		this.colors[color].classList.remove('tenue')

	}

	capturarEvents(){
		this.colors.groc.addEventListener('click', this.colorEscollit)
		this.colors.blau.addEventListener('click', this.colorEscollit)
		this.colors.vermell.addEventListener('click', this.colorEscollit)
		this.colors.verd.addEventListener('click', this.colorEscollit)
	}

	cancelarEvents(){
		this.colors.groc.removeEventListener('click', this.colorEscollit)
		this.colors.blau.removeEventListener('click', this.colorEscollit)
		this.colors.vermell.removeEventListener('click', this.colorEscollit)
		this.colors.verd.removeEventListener('click', this.colorEscollit)
	}

	colorEscollit(ev){
		const color_identificat = ev.target.dataset.color
		const numero_color = this.transformarColorsANumeros(color_identificat)
		this.iluminarColors(color_identificat)
		if(numero_color === this.sequencia[this.subnivell]){
			this.subnivell++
			if(this.subnivell === this.nivel){
				this.nivel++
				this.cancelarEvents()
				if(this.nivel === NIVELL_FINAL +1){
					this.jocGuanyat()
				}else{
					setTimeout(()=>this.seguentNivel(), 800)
				}
			}
		}else{
			this.jocPerdut()
		}
	}

	jocGuanyat(){
		swal("Has guanyat la partida", "Quina memòria que tens, és increible", "success")
			.then(()=>this.iniciantJoc())
	}

	jocPerdut(){
		swal("Has perdut", "Continua exercitant la ment", "error")
			.then(()=>{
				this.cancelarEvents();
				this.iniciantJoc();
			})
	}
}

function IniciarJoc(){
	window.juego = new Joc()
}
