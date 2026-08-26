"use client";

import { useEffect, useRef, useState } from "react";
import { asset } from "./asset";

type Note = { id: string; label: string; title: string; body: string; question: string; x: number; y: number };
type Station = { season: string; number: string; title: string; subtitle: string; image: string; color: string; story: string[]; quote: string; notes: Note[]; mission: { title: string; text: string } };
const storageKey = "historia-en-casa-progress-v2";

const stations: Station[] = [
  { season:"Primavera", number:"I", title:"Las huellas del deshielo", subtitle:"Moverse también era saber leer el paisaje", image:"station-1-migration.png", color:"#87a982",
    story:["El reloj se detuvo cuando la nieve empezaba a retirarse. Samara fue la primera en verlas: una fila de huellas cruzaba el barro nuevo.","Nadie caminaba sin rumbo. El grupo conocía los pasos de los animales, los ríos que crecían y los lugares donde volverían las plantas. Sus objetos podían viajar con ellos."], quote:"El camino no estaba dibujado, pero muchas personas lo recordaban.",
    notes:[
      {id:"tracks",label:"Huellas",title:"Un mapa que cambia",body:"Las huellas, el barro y las ramas rotas daban pistas sobre animales y personas. Observar bien ayudaba a decidir por dónde avanzar.",question:"¿Qué pista mirarías primero?",x:57,y:72},
      {id:"river",label:"Río",title:"Agua en movimiento",body:"Durante el deshielo, cruzar un río podía volverse difícil. Conocer sus cambios era tan importante como recordar el camino.",question:"¿Dónde buscarías un paso seguro?",x:78,y:48},
      {id:"bundles",label:"Equipaje",title:"Todo debía poder viajar",body:"Ropa, recipientes, herramientas y alimento se organizaban en cargas transportables. Cada objeto tenía que merecer su peso.",question:"¿Qué tres cosas llevarías tú?",x:39,y:48},
      {id:"herd",label:"Manada",title:"Seguir sin acercarse",body:"Los grupos humanos observaban los movimientos estacionales de los animales y compartían ese conocimiento durante generaciones.",question:"¿Qué cambia cuando llega la primavera?",x:88,y:29}],
    mission:{title:"Diario de rastros",text:"Busca tres señales de paso en un parque —una hoja doblada, una huella, una pluma— y dibuja qué crees que ocurrió. No recojas nada: observa y deja el lugar como estaba."}},
  { season:"Verano", number:"II", title:"La pared que recuerda", subtitle:"Una imagen puede guardar una pregunta", image:"station-2-art.png", color:"#d4a34c",
    story:["En el refugio, Julia descubrió cuencos con tierras de colores. Una mujer trituraba ocre; otra mezclaba carbón. En la pared aparecían animales hechos con líneas, manchas y memoria.","No sabemos con certeza qué significaban todas aquellas imágenes. Eso no las hace menos valiosas: nos enseñan que observar, imaginar y comunicar ya importaba."], quote:"No conocemos la historia completa. Por eso miramos con cuidado.",
    notes:[
      {id:"ochre",label:"Pigmentos",title:"Colores de la tierra",body:"El ocre es un mineral rico en hierro. Triturado y mezclado podía producir amarillos, rojos y marrones duraderos.",question:"¿Qué colores encuentras en la escena?",x:63,y:76},
      {id:"hands",label:"Manos",title:"Una presencia de hace milenios",body:"Algunas manos se marcaron soplando pigmento alrededor. Otras huellas se hicieron aplicando color directamente.",question:"¿Qué puede contar una silueta?",x:73,y:30},
      {id:"animals",label:"Animales",title:"Mirar antes de dibujar",body:"Las formas muestran una observación atenta del cuerpo y el movimiento. Su significado exacto sigue siendo una pregunta abierta.",question:"¿Cuál parece estar moviéndose?",x:86,y:39},
      {id:"mix",label:"Preparación",title:"Crear también es tecnología",body:"Seleccionar, triturar y mezclar materiales requiere pruebas, herramientas y conocimiento compartido.",question:"¿Qué paso crees que requiere más paciencia?",x:45,y:69}],
    mission:{title:"Una historia sin palabras",text:"Dibuja en papel kraft una escena usando solo dos colores y tres formas. Pide a otra persona que la interprete antes de contarle tu intención."}},
  { season:"Otoño", number:"III", title:"El viento cambia", subtitle:"Prepararse era una tarea de muchas manos", image:"station-3-shelter.png", color:"#c4754d",
    story:["Las aves cruzaban el cielo cuando Lucas notó que todos estaban ocupados. Unos reforzaban el cortavientos; otros cosían ropa o revisaban las reservas.","No era una carrera contra el frío, sino una conversación con él. Probaban, corregían y repartían tareas. Una mejora pequeña podía proteger a todo el grupo."], quote:"La mejor idea no siempre es la primera: es la que se prueba y mejora.",
    notes:[
      {id:"screen",label:"Cortavientos",title:"Cambiar el aire",body:"Una pantalla baja de ramas, pieles o fibras podía reducir el viento cerca del refugio. Su posición importaba tanto como el material.",question:"¿De qué dirección llega el viento?",x:36,y:38},
      {id:"needle",label:"Costura",title:"Unir para abrigar",body:"Las agujas de hueso permitieron confeccionar prendas ajustadas. Perforar, coser y reparar prolongaba la vida de cada pieza.",question:"¿Dónde ves una reparación?",x:25,y:68},
      {id:"food",label:"Cestas",title:"Ordenar para recordar",body:"Los recipientes ayudaban a transportar, clasificar y proteger recursos. Muchos materiales orgánicos apenas se conservan hoy.",question:"¿Qué separarías en distintas cestas?",x:72,y:78},
      {id:"birds",label:"Aves",title:"El cielo también avisa",body:"Los movimientos de aves y otros animales podían anunciar cambios estacionales y ayudar a anticipar el tiempo.",question:"¿Hacia dónde se dirige la bandada?",x:69,y:12}],
    mission:{title:"Refugio de sobremesa",text:"Construye un refugio pequeño con cartón, tela y pinzas. Sopla suavemente desde distintos lados y cambia una sola cosa cada vez hasta proteger una figura de papel."}},
  { season:"Invierno", number:"IV", title:"La llama compartida", subtitle:"El conocimiento crece cuando circula", image:"station-4-fire.png", color:"#66849a",
    story:["La noche llegó pronto. Alrededor del fuego, una niña observaba cómo tallaban, otra trenzaba una cesta y una persona mayor señalaba las huellas que bajaban al valle.","Samara entendió entonces que la herramienta más poderosa no estaba sobre el suelo: era la experiencia que una persona podía enseñar a otra."], quote:"Nadie guardaba todo el saber. Juntos recordaban más.",
    notes:[
      {id:"fire",label:"Fuego",title:"Una tarea constante",body:"El fuego ofrecía calor, luz y protección, pero mantenerlo exigía combustible, atención y aprendizaje. No era un botón: era una responsabilidad.",question:"¿Qué tareas exige una llama?",x:42,y:54},
      {id:"tools",label:"Herramientas",title:"Conocimiento con forma",body:"Elegir la piedra, golpear con precisión y aprovechar cada fragmento requería práctica y enseñanza. Tecnología significa conocimiento aplicado.",question:"¿Qué diferencias ves entre las piezas?",x:50,y:69},
      {id:"art",label:"Pared",title:"Memoria en el refugio",body:"Imágenes y signos convivían con las tareas cotidianas. No podemos asegurar su sentido, pero sí observar dónde y cómo se hicieron.",question:"¿Qué detalle se repite?",x:18,y:24},
      {id:"valley",label:"Valle",title:"Leer desde lejos",body:"La nieve hacía visibles recorridos que otros suelos ocultaban. Compartir observaciones ayudaba al grupo a planificar.",question:"¿Cuántos rastros diferentes ves?",x:78,y:42}],
    mission:{title:"Una cadena de saber",text:"Una persona enseña a otra un nudo, un ritmo o un plegado de papel. La segunda lo enseña a una tercera. Comparad el resultado y contad qué explicación funcionó mejor."}}
];

export default function StoryExperience() {
  const [opened,setOpened]=useState(false),[station,setStation]=useState(0),[focus,setFocus]=useState<string|null>(null),[discovering,setDiscovering]=useState<string|null>(null),[storyOpen,setStoryOpen]=useState(false),[visited,setVisited]=useState<string[]>([]);
  const discoveryTimer=useRef<number|null>(null);
  const current=stations[station],activeNote=current.notes.find(note=>note.id===focus);
  // El progreso persistido solo existe en el cliente; se restaura tras la hidratación.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(()=>{try{const saved=JSON.parse(localStorage.getItem(storageKey)||"null") as {opened?:boolean;station?:number;visited?:string[]}|null;if(saved){setOpened(Boolean(saved.opened));setStation(Math.min(3,Math.max(0,saved.station||0)));setVisited(Array.isArray(saved.visited)?saved.visited:[])}}catch{}},[]);
  useEffect(()=>{try{localStorage.setItem(storageKey,JSON.stringify({opened,station,visited}))}catch{}},[opened,station,visited]);
  useEffect(()=>{const close=(event:KeyboardEvent)=>{if(event.key==="Escape"){setFocus(null);setStoryOpen(false)}};window.addEventListener("keydown",close);return()=>{window.removeEventListener("keydown",close);if(discoveryTimer.current)window.clearTimeout(discoveryTimer.current)}},[]);
  const cancelDiscovery=()=>{if(discoveryTimer.current)window.clearTimeout(discoveryTimer.current);discoveryTimer.current=null;setDiscovering(null)};
  const chooseStation=(index:number)=>{cancelDiscovery();setStation(index);setFocus(null);setStoryOpen(false)};
  const inspect=(id:string)=>{setStoryOpen(false);if(visited.includes(id)){setFocus(id);return}cancelDiscovery();setDiscovering(id);setVisited(v=>[...v,id]);discoveryTimer.current=window.setTimeout(()=>{setFocus(id);setDiscovering(null);discoveryTimer.current=null},620)};
  const closeBook=()=>{cancelDiscovery();setOpened(false);setFocus(null);setStoryOpen(false)};

  if(!opened)return <section className="forest-cover" aria-labelledby="cover-title">
    <img className="forest-art" src={asset("book-closed-forest.png")} alt="Un libro azul cerrado descansa sobre el musgo del bosque"/><div className="forest-vignette"/>
    <header className="cover-brand"><span>La historia</span><strong>se hace en casa</strong></header>
    <div className="cover-intro"><p className="kicker">Año uno · Los orígenes</p><h1 id="cover-title">Hay un libro<br/>esperando en el bosque</h1><p>Cuatro estaciones. Cuatro viajes. Todo empieza al tocar la cubierta.</p></div>
    <button className="open-book" onClick={()=>setOpened(true)} aria-label="Abrir el libro y comenzar el viaje"><span className="pulse"/><span>Abrir el libro</span><small>toca la cubierta</small></button>
    <p className="landscape-hint">Una experiencia creada para tablet y pantalla grande</p>
  </section>;

  return <section className="reader" style={{"--season":current.color} as React.CSSProperties}>
    <div className="portrait-gate"><span aria-hidden="true">↻</span><strong>Gira el móvil</strong><p>Este libro se disfruta en horizontal.</p></div>
    <header className="reader-header"><button className="wordmark" onClick={closeBook}><span>La historia</span> se hace en casa</button><p>Año 1 · Los orígenes</p><div className="reader-tools"><span>{visited.length} hallazgos</span><button onClick={closeBook}>Cerrar libro</button></div></header>
    <nav className="bookmarks" aria-label="Estaciones del primer año">{stations.map((item,index)=><button key={item.season} className={station===index?"active":""} style={{"--tab":item.color} as React.CSSProperties} onClick={()=>chooseStation(index)} aria-current={station===index?"page":undefined}><span>{item.number}</span>{item.season}</button>)}</nav>
    <div className="reading-desk">
      <article className={`book-spread ${focus||storyOpen?"is-zoomed":""}`} aria-label={`${current.season}: ${current.title}`}>
        <img className="spread-art" src={asset(current.image)} alt={`Escena ilustrada de ${current.title.toLowerCase()}`}/><div className="paper-shade"/><div className="spine"/>
        <header className="chapter-label"><span>{current.number} · {current.season}</span><h1>{current.title}</h1><p>{current.subtitle}</p></header>
        {current.notes.map(note=><button key={note.id} className={`story-pin ${visited.includes(note.id)?"discovered":""} ${discovering===note.id?"discovering":""} ${focus===note.id?"active":""}`} style={{left:`${note.x}%`,top:`${note.y}%`}} onClick={()=>inspect(note.id)} aria-label={visited.includes(note.id)?`Volver a ${note.label}`:`Buscar un hallazgo cerca de ${note.label}`} aria-pressed={focus===note.id}><span className="discovery-mark" aria-hidden="true">✦</span><span className="discovery-ring" aria-hidden="true"/><small>{visited.includes(note.id)?note.label:""}</small></button>)}
        <button className="story-ribbon" onClick={()=>{setStoryOpen(true);setFocus(null)}}><span>Leer</span> el relato</button><div className="folio left">Año 1</div><div className="folio right">{station+1} / 4</div>
      </article>
      {(activeNote||storyOpen)&&<aside className="zoom-note" role="dialog" aria-modal="true" aria-label={activeNote?activeNote.title:current.title}><button className="close-note" onClick={()=>{setFocus(null);setStoryOpen(false)}} aria-label="Cerrar nota">×</button>
        {activeNote?<><p className="note-type">Hallazgo · {activeNote.label}</p><h2>{activeNote.title}</h2><p>{activeNote.body}</p><blockquote>{activeNote.question}</blockquote></>:<><p className="note-type">Estación {current.number} · {current.season}</p><h2>{current.title}</h2>{current.story.map(paragraph=><p key={paragraph}>{paragraph}</p>)}<blockquote>{current.quote}</blockquote><div className="mission"><span>Para hacer en casa</span><h3>{current.mission.title}</h3><p>{current.mission.text}</p></div></>}
      </aside>}
    </div>
    <footer className="reader-footer"><p><span className="mouse-icon" aria-hidden="true">⌁</span> Explora la ilustración: los hallazgos están escondidos.</p><div className="progress-dots">{stations.map((item,index)=><button key={item.season} onClick={()=>chooseStation(index)} aria-label={`Ir a ${item.season}`} className={station===index?"active":""}/>)}</div><p className="adult-note">Historia para explorar en familia · 6–12 años</p></footer>
  </section>;
}
