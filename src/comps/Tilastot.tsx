import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

interface Props{
    tilastot : Tilastot
    pelaaja : Pelaaja
    paivitaTilastot : (tilasto : string) => void
    haeData2 : () => void
}

const Tilastot : React.FC<Props> = ({tilastot, pelaaja, paivitaTilastot, haeData2}) : React.ReactElement => {

  const lomakeTiedot : Tilastot = useRef<Tilastot>({});

  const syoteKasittelija = (e : React.ChangeEvent<HTMLInputElement>) : void =>{
    lomakeTiedot.current[e.target.name] = e.target.value;
    paivitaTilastot(`${lomakeTiedot.current.season}`)
  }

  const nappulaKasittelija = (e : React.FormEvent) : void =>{
    haeData2()
  }

  return (
    <>
    <Typography variant="h5" sx={{textAlign : "center", marginBottom : "10px"}}>Valitse kausi ja tarkastele pelaajan {pelaaja.etuNimi} {pelaaja.sukuNimi} keskiarvo tilastoja!</Typography>
    <Typography variant="h4" sx={{textAlign : "center", marginBottom : "20px"}}>Kausi {tilastot.kausi}</Typography>
    <Box sx={{display : "flex", gap : "2em", justifyContent : "center"}}>
      <div>
        <Typography variant="h6">Pelatut pelit: {tilastot.games}</Typography>
        <Typography variant="h6">Minuutit: {tilastot.min}</Typography>
        <Typography variant="h6">Pisteet: {tilastot.points}</Typography>
        <Typography variant="h6">Turnoverit: {tilastot.turnover}</Typography>
      </div>

      <div>
        <Typography variant="h6">Levypallot: {tilastot.reb}</Typography>
        <Typography variant="h6">Syötöt: {tilastot.ast}</Typography>
        <Typography variant="h6">Riistot: {tilastot.stl}</Typography>
        <Typography variant="h6">Blokit: {tilastot.blk}</Typography>
      </div>
    </Box>

    <Box sx={{display : "flex", flexDirection : "column"}}>
      <TextField 
        error={Boolean(tilastot.virhe)}
        helperText={tilastot.virhe}
        name="season"
        label="Kausi..."
        variant="outlined"
        sx={{margin : "1em auto", width : "60%"}}
        onChange={syoteKasittelija}
      />

      <Button 
        sx={{width : "50%", margin : "0.5em auto"}}
        variant="contained"
        onClick={nappulaKasittelija}
        >Vaihda kautta</Button>

      <Button
        sx={{width : "40%", margin : "0.5em auto"}}
        component={Link}
        to="/"
        >Takaisin etusivulle</Button>
    </Box>
    </>
  );
}

export default Tilastot;