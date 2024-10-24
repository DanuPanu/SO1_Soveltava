import { Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import Etusivu from './comps/Etusivu';
import Tilastot from './comps/Tilastot';
import Rekisterointi from './comps/Rekisterointi';
import { Route, Routes } from 'react-router-dom';

const App : React.FC = () : React.ReactElement => {

  const pyyntoLahetetty : React.MutableRefObject<boolean> = useRef(false);

  const [joukkue, setJoukkue] = useState<any>([])

  const [pelaaja, setPelaaja] = useState<Pelaaja>({
                                          id : "237",
                                          haku : "lebron james",
                                          virhe : "",
                                          etuNimi : "",
                                          sukuNimi : "",
                                          pituusFeet : "",
                                          pituusInches : "",
                                          paino : "",
                                          joukkue : "",
                                          konferenssi : "",
                                          pelipaikka : ""
  })

  const [tilastot, setTilastot] = useState<Tilastot>({
                                          virhe : "",
                                          season : "2022",
                                          kausi : "2022",
                                          games : "",
                                          min : "",
                                          reb : "",
                                          ast : "",
                                          stl : "",
                                          blk : "",
                                          turnover : "",
                                          points : "",
                                          fg_pct : "",
                                          fg3_pct : "",
                                          ft_pct : ""
  })

  const paivitaPelaaja = (peluri : string) => {
    setPelaaja({...pelaaja, haku : peluri})
  }
  const paivitaTilastot = (tilasto : string) => {
    setTilastot({...tilastot, season : tilasto})
  }

  const [etunimi, setEtunimi] = useState<any>("");
  const [nakyy, setNakyy] = useState<any>("none");

  const haeData = async () : Promise<void> => {
    try {
      const yhteys : Response = await fetch(`https://www.balldontlie.io/api/v1/players?search=${pelaaja.haku}`);
      const yhteys2 : Response = await fetch(`https://www.balldontlie.io/api/v1/season_averages?season=${tilastot.season}&player_ids[]=${pelaaja.id}`);
      const data : any = await yhteys.json();
      const data2 : any = await yhteys2.json();

      setPelaaja({...pelaaja,
        virhe : "",
        id : data.data[0].id,
        etuNimi : data.data[0].first_name,
        sukuNimi : data.data[0].last_name,
        pituusFeet : data.data[0].height_feet,
        pituusInches : data.data[0].height_inches,
        paino : data.data[0].weight_pounds,
        joukkue : data.data[0].team.full_name,
        konferenssi : data.data[0].team.conference,
        pelipaikka : data.data[0].position})

      setTilastot({...tilastot,
        season : data2.data[0].season,
        kausi : data2.data[0].season,
        games : data2.data[0].games_played,
        min : data2.data[0].min,
        reb : data2.data[0].reb,
        ast : data2.data[0].ast,
        stl : data2.data[0].stl,
        blk : data2.data[0].blk,
        turnover : data2.data[0].turnover,
        points : data2.data[0].pts,
        fg_pct : data2.data[0].fg_pct * 100,
        fg3_pct : data2.data[0].fg3_pct * 100,
        ft_pct : data2.data[0].ft_pct * 100})
      }
      
    catch (e: any) {
      setPelaaja({...pelaaja, virhe : "Pelaajaa ei löytynyt"})
    }
  }

  const haeData2 = async () : Promise<void> => {
    try{
      const yhteys2 : Response = await fetch(`https://www.balldontlie.io/api/v1/season_averages?season=${tilastot.season}&player_ids[]=${pelaaja.id}`);
      const data2 : any = await yhteys2.json();

      setTilastot({...tilastot,
        season : data2.data[0].season,
        kausi : data2.data[0].season,
        games : data2.data[0].games_played,
        min : data2.data[0].min,
        reb : data2.data[0].reb,
        ast : data2.data[0].ast,
        stl : data2.data[0].stl,
        blk : data2.data[0].blk,
        turnover : data2.data[0].turnover,
        points : data2.data[0].pts,
        fg_pct : data2.data[0].fg_pct * 100,
        fg3_pct : data2.data[0].fg3_pct * 100,
        ft_pct : data2.data[0].ft_pct * 100,
        virhe : ""})
    }
    catch(e : any){
      setTilastot({...tilastot, virhe : "Pelaaja ei pelannut tällä kaudella tai kausi on tulevaisuudessa!"})
    }
  }

  const haeJengit = async () : Promise<void> => {
    try{
      const yhteys3 : Response = await fetch(`https://www.balldontlie.io/api/v1/teams`);
      const data3 : any = await yhteys3.json();

      let x = 0
        while(x < 30){
          joukkue.push(data3.data[x].full_name)
          x++
        }
    } 
    catch(e : any){}
  }

  useEffect(() => {
    if (!pyyntoLahetetty.current) {
      haeJengit();
      haeData();
      if (localStorage.getItem("nimi")) {
        setEtunimi(localStorage.getItem("nimi"))
        setNakyy(localStorage.getItem("nakyy"))
      }
    }
    return () => {
      pyyntoLahetetty.current = true;
    }
  });

  useEffect(() => {

    localStorage.setItem("nimi", etunimi);
    localStorage.setItem("nakyy", "block");

  }, [etunimi]);

  return (
    <>
    <Typography variant="h2" sx={{textAlign : "center", textDecoration : "underline", backgroundColor : "lightblue", padding : "10px", marginBottom : "20px"}}>NBA Tilastoja</Typography>
    <Routes>
      <Route path="/" element={<Etusivu nakyy={nakyy} etunimi={etunimi} pelaaja={pelaaja} haeData={haeData} paivitaPelaaja={paivitaPelaaja}/>}/>
      <Route path="/tilastot" element={<Tilastot pelaaja={pelaaja} tilastot={tilastot} haeData2={haeData2} paivitaTilastot={paivitaTilastot}/>}/>
      <Route path="/rekisterointi" element={<Rekisterointi setEtunimi={setEtunimi} setNakyy={setNakyy} joukkue={joukkue}/>}/>
    </Routes>
    </>
  );
}

export default App;
