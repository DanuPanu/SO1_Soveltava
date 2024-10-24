import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

interface Props{
    pelaaja : Pelaaja
    etunimi : any
    nakyy : string
    haeData : () => void
    paivitaPelaaja : (peluri : string) => void
}

const Etusivu : React.FC<Props> = ({pelaaja, etunimi, nakyy, haeData, paivitaPelaaja}) : React.ReactElement => {

  const lomakeTiedot : Pelaaja = useRef<Pelaaja>({});

  const syoteKasittelija = (e : React.ChangeEvent<HTMLInputElement>) : void =>{
    lomakeTiedot.current[e.target.name] = e.target.value;
    paivitaPelaaja(`${lomakeTiedot.current.haku}`)
  }

  const nappulaKasittelija = (e : React.FormEvent) : void =>{
    haeData()
  }

  return (
    <>
    <Typography variant="h5" sx={{display : nakyy, marginBottom : "10px", textAlign : "center"}}>Tervetuloa {etunimi.toUpperCase()}!</Typography>
    <Typography variant="h5" sx={{textAlign : "center", fontWeight : "bold", marginBottom : "20px"}}>Valitse lempipelaajasi ja tarkastele heidän tilastojaan!</Typography>
    <Box sx={{display : "flex", gap : "2em", justifyContent : "center"}}>
      <div>
        <Typography variant="h6">Nimi: {pelaaja.etuNimi} {pelaaja.sukuNimi}</Typography>
        <Typography variant="h6">Pituus: {(pelaaja.pituusFeet * 0.3048 + pelaaja.pituusInches * 0.0254).toFixed(2)} m</Typography>
        <Typography variant="h6">Paino: {(pelaaja.paino * 0.45359237).toFixed(2)} kg</Typography>
      </div>

      <div>
        <Typography variant="h6">Joukkue: {pelaaja.joukkue}</Typography>
        <Typography variant="h6">Konferenssi: {pelaaja.konferenssi}</Typography>
        <Typography variant="h6">Pelipaikka: {pelaaja.pelipaikka}</Typography>
      </div>
    </Box>

    <Box sx={{display : "flex", marginTop : "1.5em"}}>
      <div style={{display : "flex", alignItems  : "center", flexDirection : "column", gap : "0.5em", width : "100%"}}>
        <TextField 
          error={Boolean(pelaaja.virhe)}
          helperText={pelaaja.virhe}
          name="haku"
          label="Pelaajan nimi..."
          variant="outlined"
          sx={{width : "70%"}}
          onChange={syoteKasittelija}
        />
        <Button 
          sx={{width : "70%", padding : "7px"}}
          variant="contained"
          onClick={nappulaKasittelija}
          >Vaihda pelaajaa</Button>
      </div>

      <div style={{display : "flex", justifyContent : "center", alignItems : "center", flexDirection : "column", gap : "0.5em", width : "100%"}}>
        <Button
          sx={{width : "70%", padding : "10px"}}
          variant="contained"
          component={Link}
          to="/tilastot"
          >Tilastot</Button>

        <Button
          sx={{width : "70%", padding : "10px"}}
          variant="contained"
          component={Link}
          to="/rekisterointi"
          >Rekisteröidy</Button>
      </div>
      </Box>
    </>
  );
}

export default Etusivu;