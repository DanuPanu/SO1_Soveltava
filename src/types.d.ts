interface Pelaaja{
    [key : string] : any
    id? : string
    virhe? : string
    haku? : string
    etuNimi? : string
    sukuNimi? : string
    pituusFeet? : any
    pituusInches? : any
    paino? : any
    joukkue? : string
    konferenssi? : string
    pelipaikka? : string
}

interface Tilastot{
    [key : string] : any
    virhe? : any
    season? : string
    kausi? : string
    games? : string
    min? : string
    reb? : string
    ast? : string
    stl? : string
    blk? : string
    turnover? : string
    points? : string
    fg_pct? : any
    fg3_pct? : any
    ft_pct? : any
}

interface Lomaketiedot{
    [key : string] : any
    etunimi? : string
    sukunimi? : string
    puhelin? : number | string
    sposti? : string
    jengi? : any
  }

  interface Joukkueet{
    [key : string] : any
    nimi? : any
  }