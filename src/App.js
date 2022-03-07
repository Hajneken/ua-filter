import React, { useState, useEffect, useRef } from 'react';

// fonts
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// images
import howTo from './howTo.png'

// material icons
import SaveIcon from '@mui/icons-material/Save';
import ImageIcon from '@mui/icons-material/Image';
import GitHubIcon from '@mui/icons-material/GitHub';

// Material Components
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import CookieIcon from '@mui/icons-material/Cookie';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// styles and typography
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { H1 } from './components/H1/styled';
import Typography from '@mui/material/Typography';

function App() {

  const theme = createTheme({
    palette: {
      primary: {
        main: '#1e88e5',
      },
      secondary: {
        main: '#fdd835',
      },
    },
  });

  // official flag values
  // const blue = "#0057b7";
  // const yellow = "#ffd700";

  const blue = "#80abdb";
  const yellow = "#ffeb80";

  const blueDarker = "#002c5c";
  const yellowDarker = "#806c00";

  // converted state values
  const [blueRGB, setBlueRGB] = useState(null);
  const [blueRGBDarker, setBlueRGBDarker] = useState(null);

  const [yellowRGB, setYellowRGB] = useState(null);
  const [yellowRGBDarker, setYellowRGBDarker] = useState(null);

  const [inputImg, setInputImg] = useState(null);
  const [resImg, setResImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackOpen, setSnackOpen] = useState(true);

  // refs
  const canvas = useRef(null);
  const img = useRef(null);
  const downloadLink = useRef(null);

  // app initialization
  useEffect(() => {
    if (!yellowRGB && !blueRGB) {
      setBlueRGB(hexToRgb(blue))
      setYellowRGB(hexToRgb(yellow))
      setBlueRGBDarker(hexToRgb(blueDarker))
      setYellowRGBDarker(hexToRgb(yellowDarker))
    }
  }, [yellowRGB, blueRGB])

  // converter
  const hexToRgb = (hex) => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  // https://stackoverflow.com/questions/39854891/how-to-save-an-image-with-css-filter-applied
  // https://stackoverflow.com/questions/34909598/use-canvas-drawimage-to-separate-img-into-two-halves/34910256
  const drawImg = () => {
    let ctx = canvas.current.getContext('2d');

    canvas.current.height = img.current.height
    canvas.current.width = img.current.width

    // URL ctx.filter unsupported in Safari
    ctx.filter = "url(#blue)"
    ctx.drawImage(img.current, 0, 0, img.current.width, img.current.height / 2, 0, 0, img.current.width, img.current.height / 2)
    ctx.filter = "url(#yellow)"
    ctx.drawImage(img.current, 0, img.current.height / 2, img.current.width, img.current.height / 2, 0, img.current.height / 2, img.current.width, img.current.height / 2);

    setResImg(canvas.current.toDataURL("image/jpeg"));
    setLoading(false);
  }

  const handleImgUpload = (e) => {
    e.preventDefault();
    setInputImg(URL.createObjectURL(e.target.files[0]));
    setLoading(true);
  }

  const triggerDownload = () => {
    downloadLink.current.click();
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <div className="container">
          <header className="App-header">
            <H1>Support Ukraine Filter</H1>
          </header>
          <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            open={snackOpen}
            onClose={() => setSnackOpen(false)}
          >
            <Alert icon={<CookieIcon />} onClose={() => setSnackOpen(false)} severity="info" sx={{ width: '100%' }}>
              I use cookies to see how many people visit. That's it.
            </Alert>
          </Snackbar>

          {loading && <div style={{ width: "100%", marginTop: "20px" }}>
            <CircularProgress />
          </div>}
          <main>
            <Accordion className='m-10'>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography><strong>What is this?</strong></Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography align="left">
                  This app lets you upload an arbitrary image and apply <a href="https://en.wikipedia.org/wiki/Duotone" target="_blank" rel="noreferrer">duotone</a> filer resembling the Ukrainian flag.
                  <br />
                  Your data is <strong>not</strong> uploaded or stored anywhere. All the processing takes place in your browser.
                  <br /> More importantly, the app provides compiled list of links to official resources for refugees fleeing Ukraine (see Important Links).
                  <img src={howTo} alt="Example of filter application" style={{ width: "100%" }} />
                  Fancy a cool refresh of your profile picture? 😉
                  <br />

                  <strong>Note: Safari Browsers for MAC and iOS are unsupported due to technical limitations.</strong>
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion className='m-10'>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1b-content"
                id="panel1b-header"
              >
                <Typography><strong>Why should I care?</strong></Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography align="left">
                  <strong>Short answer:</strong> Putin has started a <strong>war</strong> in Europe.<br />
                  <strong>Long answer:</strong>  Following the recognition of Ukrainian seperataist regions, the self-proclaimed <abbr title="Donetsk People's Republic">DPR</abbr> and <abbr title="Luhansk People's Republic">LPR</abbr> as on the February 21, 2022,the dictator of the authoritarian Russia, Vladimir Vladimirovich Putin has launched under a faked pretext a full-scale invasion of sovereign country of Ukraine. Russian Federation is a totalitarian regime known for suppressing the freedom of speech by means of state propaganda, censorship, systematic jailing and murdering of any opposition and support of state-sponsored terrorism. After decades of peace in Europe, Putin has started war in Europe. Millions of people were forced to leave their homes. This unprovoked attack on democratic values and ongoing efforts to destabilize democratic countries threatens the global peace and stability.
                  <br />
                  <a href="https://en.wikipedia.org/wiki/Russo-Ukrainian_War" target="_blank" rel="noreferrer">Learn more about the conflict</a>
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion className="m-10 important">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1c-content"
                id="panel1c-header"
              >
                <Typography><strong>Important Links (Важливі посилання)</strong></Typography>
              </AccordionSummary>
              <AccordionDetails>
                <ul style={{ textAlign: "left", listStyleType: "none" }}>
                  <li><Button style={{ fontWeight: 600 }} href="https://www.gov.pl/web/mswia-en/information-for-refugees-from-ukraine" target="_blank" rel="noreferrer">🇵🇱 Get Help in Poland | Отримати допомогу в Польщі</Button></li>
                  <li><Button style={{ fontWeight: 600 }} href="https://ua.gov.sk/en.html" target="_blank" rel="noreferrer">🇸🇰 Get Help in Slovakia | Отримати допомогу в Словаччині </Button></li>
                  <li><Button style={{ fontWeight: 600 }} href="https://helsinki.hu/en/information-for-people-fleeing-from-ukraine/" target="_blank" rel="noreferrer">🇭🇺 Get Help in Hungary | Отримати допомогу в Угорщині</Button></li>
                  <li><Button style={{ fontWeight: 600 }} href="https://romania.iom.int/news/useful-information-people-entering-romania-ukraine" target="_blank" rel="noreferrer">🇷🇴 Get Help in Romania | Отримайте допомогу в Румунії</Button></li>
                  <li><Button style={{ fontWeight: 600 }} href="https://nasiukrajinci.cz/" target="_blank" rel="noreferrer">🇨🇿 Help / Get Help in the Czech Republic | Допомога / Отримати допомогу в Чеській Республіці</Button></li>
                </ul>
              </AccordionDetails>
            </Accordion>
            <div className="mt-10 mb-1">
              <label htmlFor="contained-button-file">
                <input accept="image/*" id="contained-button-file" onChange={handleImgUpload} multiple type="file" style={{ display: 'none' }} />
                <Button variant="contained" component="span" endIcon={<ImageIcon />} style={
                  { marginRight: "1rem" }
                }>
                  Upload
                </Button>
              </label>
              <Button ref={downloadLink} variant="contained" href={resImg} disabled={!resImg} color="secondary" endIcon={<SaveIcon />} download >Download</Button>
            </div>
            <img ref={img} src={inputImg} key={inputImg} onLoad={drawImg} alt="Original" style={{ display: "none" }} />
            {resImg !== null && <img src={resImg} alt="Processed with Ukraine Filter" style={{ display: "none" }} />}
            <div>
              <Stack className="skeleton" style={inputImg ? { display: "none" } : { display: "block" }} spacing={1}>
                <Skeleton variant="text" width={210} animation={false} />
                <Skeleton variant="circular" width={40} height={40} animation={false} />
                <Skeleton variant="rectangular" width={210} height={118} animation={false} />
              </Stack>
              <canvas id="Img" onClick={triggerDownload} ref={canvas} style={!inputImg ? { display: "none" } : { display: "block" }} >Please Use Modern Web Browser</canvas>
            </div>
            {
              (blueRGB && yellowRGB && blueRGBDarker && yellowRGBDarker) && (
                <div className="filters">
                  <svg xmlns="http://www.w3.org/2000/svg">
                    <filter id="blue">
                      <feColorMatrix type="matrix" result="grayscale"
                        values="1 0 0 0 0
                              1 0 0 0 0
                              1 0 0 0 0
                              0 0 0 1 0" >
                      </feColorMatrix>
                      <feComponentTransfer colorInterpolationFilters="sRGB" result="blue">
                        <feFuncR type="table" tableValues={`${(blueRGBDarker.r) / 255} ${blueRGB.r / 255}`}></feFuncR>
                        <feFuncG type="table" tableValues={`${(blueRGBDarker.g) / 255} ${blueRGB.g / 255}`}></feFuncG>
                        <feFuncB type="table" tableValues={`${(blueRGBDarker.b) / 255} ${blueRGB.b / 255}`}></feFuncB>
                        <feFuncA type="table" tableValues="0 1"></feFuncA>
                      </feComponentTransfer>
                    </filter>
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg">
                    <filter id="yellow">
                      <feColorMatrix type="matrix" result="grayscale"
                        values="1 0 0 0 0
                              1 0 0 0 0
                              1 0 0 0 0
                              0 0 0 1 0" >
                      </feColorMatrix>
                      <feComponentTransfer colorInterpolationFilters="sRGB" result="yellow">
                        <feFuncR type="table" tableValues={`${yellowRGBDarker.r / 255} ${yellowRGB.r / 255}`}></feFuncR>
                        <feFuncG type="table" tableValues={`${yellowRGBDarker.g / 255} ${yellowRGB.g / 255}`}></feFuncG>
                        <feFuncB type="table" tableValues={`${yellowRGBDarker.b / 255} ${yellowRGB.b / 255}`}></feFuncB>
                        <feFuncA type="table" tableValues="0 1"></feFuncA>
                      </feComponentTransfer>
                    </filter>
                  </svg>
                </div>
              )
            }
          </main>
        </div>

        <footer>
          <Typography variant="h5" gutterBottom component="div">
            Слава Україні!
          </Typography>

          <Typography variant="h3" gutterBottom component="div">
            <a style={{ color: "white" }} href="https://github.com/Hajneken/ua-filter" target="_blank" rel="noreferrer">
              <GitHubIcon fontSize="large" />
            </a>
          </Typography>

          <Typography variant="subtitle1" gutterBottom component="div">Made with ❤ in 🇨🇿 by <a style={{ color: "white" }} href="https://www.zemanec.me" rel="noreferrer">Hynek Zemanec</a></Typography>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
