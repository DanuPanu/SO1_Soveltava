import { Box, Button, Container, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import { SystemStyleObject } from '@mui/system';
import { useRef, useState } from 'react';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';


const tyyli : SystemStyleObject = {
  marginTop : "10px",
  width : "75%"
}

interface Props {
  joukkue : any
  setEtunimi : (arg0 : any) => void
  setNakyy : (arg0 : any) => void
}

interface Virheet extends Lomaketiedot {}

const Rekisterointi : React.FC<Props> = (props : Props) : React.ReactElement =>{

  const navigate : NavigateFunction = useNavigate();

  const [virheIlmoitukset, setVirheIlmoitukset] = useState<Virheet>({});

  const lomakeTiedot : Lomaketiedot = useRef<Lomaketiedot>({});

  const lomakeKasittelija = (e : React.FormEvent) : void =>{
    e.preventDefault();

    let virheet : Virheet = {};

    if (!lomakeTiedot.current.etunimi || lomakeTiedot.current.etunimi.length < 2){
      virheet = {...virheet, etunimi : "Etunimi puuttuu"}
    }

    if (!lomakeTiedot.current.sukunimi || lomakeTiedot.current.sukunimi.length < 2){
      virheet = {...virheet, sukunimi : "Sukunimi puuttuu"}
    }

    if (!lomakeTiedot.current.puhelin && !lomakeTiedot.current.sposti){
      virheet = {...virheet, sposti : "Anna sähköpostiosoite tai puhelinnumero"}
      virheet = {...virheet, puhelin : "Anna sähköpostiosoite tai puhelinnumero"}
    }
  
    if (Object.entries(virheet).length > 0){
      setVirheIlmoitukset({...virheet});
    }else{
      props.setEtunimi(lomakeTiedot.current.etunimi)
      props.setNakyy("block")
      navigate("/")
      alert(`Kiitos rekisteröitymisestä ${lomakeTiedot.current.etunimi} ${lomakeTiedot.current.sukunimi}! Saat uutiskirjeemme osoitteeseen ${lomakeTiedot.current.sposti} tai tekstiviestillä numeroon ${lomakeTiedot.current.puhelin}. Go ${team}!`)
    }
  }

  const syoteKasittelija = (e : React.ChangeEvent<HTMLInputElement>) : void =>{
    lomakeTiedot.current[e.target.name] = e.target.value;
  }

  const [team, setTeam] = useState<any>('');
  const handleChange = (event: SelectChangeEvent) => {
    setTeam(event.target.value);
  };

  return (
    <>
    <Typography variant="h5" sx={{textAlign : "center", textDecoration : "underline", marginBottom : "15px"}}>Rekisteröidy niin saat kaikki jäsenedut!</Typography>
    <Container>
      <form style={{display : "flex", alignItems : "center"}} onSubmit={lomakeKasittelija}>
        <Box sx={{display : "flex", flexDirection : "column", width : "100%", alignItems : "center"}}>
          <TextField sx={tyyli}
            name="etunimi"
            label="Etunimi..."
            placeholder="Etunimi"
            onChange={syoteKasittelija}
            error={Boolean(virheIlmoitukset.etunimi)}
            helperText={virheIlmoitukset.etunimi}/>
          <TextField sx={tyyli}
            name="sukunimi"
            label="Sukunimi..."
            placeholder="Sukunimi"
            onChange={syoteKasittelija}
            error={Boolean(virheIlmoitukset.sukunimi)}
            helperText={virheIlmoitukset.sukunimi}/>
        </Box>
        <Box sx={{width : "100%", display : "flex", flexDirection : "column", justifyContent : "center", alignItems : "center"}}>
          <TextField sx={tyyli}
            name="puhelin"
            label="Puhelinnumero..."
            placeholder="Puhelinnumero"
            onChange={syoteKasittelija}
            error={Boolean(virheIlmoitukset.puhelin)}
            helperText={virheIlmoitukset.puhelin}/>
          <TextField sx={tyyli}
            name="sposti"
            label="Sähköpostiosoite..."
            placeholder="Sähköpostiosoite"
            onChange={syoteKasittelija}
            error={Boolean(virheIlmoitukset.sposti)}
            helperText={virheIlmoitukset.sposti}/>
        </Box>
      </form>
    </Container>
    <Box sx={{display : "flex", flexDirection : "column", justifyContent : "center", alignItems : "center", marginTop : "20px"}}>
      <Typography variant='h6' sx={{fontWeight : "normal"}}>Valitse lempijoukkueesi!</Typography>
      <Select value={team} onChange={handleChange} sx={{width : "75%"}}>
        {props.joukkue.map((jengi : string, idx : number) => {
          return <MenuItem key={idx} value={jengi}>{jengi}</MenuItem>
        })}
      </Select>
      <Button variant="contained" sx={{width : "50%", marginTop : "10px"}}
        onClick={lomakeKasittelija}
        >Lähetä ilmoittautuminen!</Button>
      <Button
        sx={{marginTop : "10px", width : "40%"}}
        component={Link}
        to="/"
        >Takaisin etusivulle</Button>
    </Box>
    </>
  );
}

export default Rekisterointi;