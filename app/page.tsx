import StoryExperience from "./story-experience";
import { asset } from "./asset";
const people = [
  {name:"Samara",age:8,role:"La observadora",quote:"¿Por qué lo hacían así?",pos:"left"},
  {name:"Julia",age:7,role:"La creadora",quote:"¡Vamos a probarlo!",pos:"center"},
  {name:"Lucas",age:6,role:"El pequeño",quote:"¿Y si no sabemos?",pos:"right"}
];
export default function Home() { return <>
  <header className="site-header"><a className="brand" href="#inicio">La historia se hace en casa</a><nav aria-label="Principal"><a href="#viajeros">Viajeros</a><a href="#cuento">Cuento</a><a href="#actividades">Actividades</a><a href="#mapa">Mapa</a></nav></header>
  <main>
    <section className="hero" id="inicio"><img src={asset("hero-forest-timepiece.png")} alt="Samara, Julia y Lucas descubren un reloj misterioso dentro de una caja en el bosque"/><div className="hero-copy"><span className="eyebrow">Cuento interactivo · 6–12 años</span><h1>El reloj del bosque antiguo</h1><p>Tres primos. Un reloj sin horas. Veinticuatro viajes para mirar el pasado con preguntas nuevas.</p><a className="button" href="#cuento">Girar la aguja <span aria-hidden="true">→</span></a><ul className="facts"><li><strong>24</strong> viajes</li><li><strong>6</strong> años</li><li><strong>1</strong> actividad por estación</li></ul></div></section>
    <section className="section" id="viajeros"><div className="section-heading"><span className="eyebrow">Los viajeros</span><h2>Tres maneras de hacer preguntas</h2><p>Observar, probar y reconocer lo que todavía no sabemos.</p></div><div className="people">{people.map(p=><article className="person card" key={p.name}><div className={`portrait ${p.pos}`}><img src={asset("characters.png")} alt=""/></div><p className="meta">{p.age} años · {p.role}</p><h3>{p.name}</h3><blockquote>“{p.quote}”</blockquote></article>)}</div></section>
    <StoryExperience />
  </main>
  <footer><p>La historia también empieza con una pregunta en casa.</p><a href="#inicio">Volver al inicio ↑</a></footer>
  </> }
