import Head from 'next/head';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';

const PADDING_TOP = 1;

const Page = () => {
  const aboutHTMLPage = `
  <!DOCTYPE html>
  <html data-wf-domain="www.pygma.co" data-wf-page="62b5885d8fac36983bac4240" data-wf-site="62b5885d8fac366b2aac4228" lang="en">
     <head>
        <meta charset="utf-8"/>
        <title>About Us | Pygma startup accelerator</title>
        <link href="https://uploads-ssl.webflow.com/62b5885d8fac366b2aac4228/css/pygma-accelerator.webflow.11cf3c51e.css" rel="stylesheet" type="text/css"/>

        <link href="https://fonts.googleapis.com" rel="preconnect"/>
        <link href="https://fonts.gstatic.com" rel="preconnect" crossorigin="anonymous"/>
        <style>
           body{
           -moz-osx-font-smoothing: grayscale;
           -webkit-font-smoothing: antialiased;
           }

           @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&display=swap");

           *,
           *::before,
           *::after {
             margin: 0;
             padding: 0;
             box-sizing: border-box;
           }

           .timeline-container {

             min-height: 100vh;
             display: grid;
             align-content: center;
             gap: 2rem;
             padding: 2rem;
             font-family: "Poppins", sans-serif;
             color: var(--color);
             background: var(--bgColor);
           }

           .timeline-container h1 {
             text-align: center;
           }

           .timeline-container ul {
             --col-gap: 2rem;
             --row-gap: 2rem;
             --line-w: 0.25rem;
             display: grid;
             grid-template-columns: var(--line-w) 1fr;
             grid-auto-columns: max-content;
             column-gap: var(--col-gap);
             list-style: none;
             width: min(60rem, 90%);
             margin-inline: auto;
           }

           /* line */
           .timeline-container ul::before {
             content: "";
             grid-column: 1;
             grid-row: 1 / span 8;
             background: #CCE700;
             border-radius: calc(var(--line-w) / 2);
           }

           /* columns*/

           /* row gaps */
           .timeline-container ul li:not(:last-child) {
             margin-bottom: var(--row-gap);
           }

           /* card */
           .timeline-container ul li {
             grid-column: 2;
             --inlineP: 1.5rem;
             margin-inline: var(--inlineP);
             grid-row: span 2;
             display: grid;
             grid-template-rows: min-content min-content min-content;
           }

           /* date */
           .timeline-container ul li .date {
             --dateH: 3rem;
             height: var(--dateH);
             margin-inline: calc(var(--inlineP) * -1);

             text-align: center;
             background-color: var(--accent-color);

             color: #CCE700;
             font-size: 1.25rem;
             font-weight: 700;

             display: grid;
             place-content: center;
             position: relative;

             border-radius: calc(var(--dateH) / 2) 0 0 calc(var(--dateH) / 2);
           }

           /* date flap */
           .timeline-container ul li .date::before {
             content: "";
             width: var(--inlineP);
             aspect-ratio: 1;
             background: var(--accent-color);
             background-image: linear-gradient(rgba(0, 0, 0, 0.2) 100%, transparent);
             position: absolute;
             top: 100%;

             clip-path: polygon(0 0, 100% 0, 0 100%);
             right: 0;
           }

           /* circle */
           .timeline-container ul li .date::after {
             content: "";
             position: absolute;
             width: 2rem;
             aspect-ratio: 1;
             background: white;
             border: 0.3rem solid var(--accent-color);
             border-radius: 50%;
             top: 50%;

             transform: translate(50%, -50%);
             right: calc(100% + var(--col-gap) + var(--line-w) / 2);
           }

           /* title descr */
           .timeline-container ul li .title,
           .timeline-container ul li .descr {
             background: var(--bgColor);
             position: relative;
             padding-inline: 1.5rem;
           }
           .timeline-container ul li .title {
             overflow: hidden;
             padding-block-start: 1.5rem;
             padding-block-end: 1rem;
             font-weight: bold;
           }
           .timeline-container ul li .descr {
             padding-block-end: 1.5rem;
             font-weight: normal;
             font-size: 80%;
           }

           /* shadows */
           .timeline-container ul li .title::before,
           .timeline-container ul li .descr::before {
             content: "";
             position: absolute;
             width: 90%;
             height: 0.5rem;
             background: rgba(0, 0, 0, 0.5);
             left: 50%;
             border-radius: 50%;
             filter: blur(4px);
             transform: translate(-50%, 50%);
           }
           .timeline-container ul li .title::before {
             bottom: calc(100% + 0.125rem);
           }

           .timeline-container ul li .descr::before {
             z-index: -1;
             bottom: 0.25rem;
           }

           @media (min-width: 40rem) {
             .timeline-container ul {
               grid-template-columns: 1fr var(--line-w) 1fr;
             }
             .timeline-container ul::before {
               grid-column: 2;
             }
             .timeline-container ul li:nth-child(odd) {
               grid-column: 1;
             }
             .timeline-container ul li:nth-child(even) {
               grid-column: 3;
             }

             /* start second card */
             .timeline-container ul li:nth-child(2) {
               grid-row: 2/4;
             }

             .timeline-container ul li:nth-child(odd) .date::before {
               clip-path: polygon(0 0, 100% 0, 100% 100%);
               left: 0;
             }

             .timeline-container ul li:nth-child(odd) .date::after {
               transform: translate(-50%, -50%);
               left: calc(100% + var(--col-gap) + var(--line-w) / 2);
             }
             .timeline-container ul li:nth-child(odd) .date {
               border-radius: 0 calc(var(--dateH) / 2) calc(var(--dateH) / 2) 0;
             }
           }

        </style>
        <script type="text/javascript">window.__WEBFLOW_CURRENCY_SETTINGS = {"currencyCode":"USD","symbol":"$","decimal":".","fractionDigits":2,"group":",","template":"{{wf {\"path\":\"symbol\",\"type\":\"PlainText\"} }} {{wf {\"path\":\"amount\",\"type\":\"CommercePrice\"} }} {{wf {\"path\":\"currencyCode\",\"type\":\"PlainText\"} }}","hideDecimalForWholeNumbers":false};</script>
     </head>
     <body>
        <div style="opacity:0" class="load-first">
           <div style="opacity:0" class="load-first">
              <div class="section no-bottom-padding wf-section">
                 <div class="w-layout-grid image-banner"><img src="https://uploads-ssl.webflow.com/62b5885d8fac366b2aac4228/62b6cdadc338e01fb063bae2_Pygma%20location%20-%20Chile.jpg"  sizes="100vw" alt="" class="fade-image"/><img src="https://uploads-ssl.webflow.com/62b5885d8fac366b2aac4228/62b6cd6dc1cc2d91553e5bf0_Pygma%20Location%20-%20Bogota.jpg" sizes="100vw" alt="" class="fade-image"/><img src="https://uploads-ssl.webflow.com/62b5885d8fac366b2aac4228/62b6ce35e86364d1681a1a6c_Pygma%20Location%20-%20Sao%20Paulo.jpg"  sizes="100vw" alt="" class="fade-image"/></div>
              </div>
           </div>
        </div>
        <div style="opacity:0" class="load-second">
           <div class="section wf-section">
              <div class="main-container-py1">
                 <div class="w-layout-grid grid-halves title-grid horizontal">
                    <div class="container reduced-width">
                       <h1 class="no-bottom-margin">We are on a mission to form the next generation of founders</h1>
                    </div>
                    <div class="container reduced-width">
                       <div class="text-white">Pygma is a LatAm based accelerator for early-stage founders, we help pre-seed founders build better tech companies by co-building tech companies and helping them raise capital. <br/><br/>Pygma is a merger from a product driven incubator in the Netherlands, and Acanof a data-driven accelerator from LatAm. We are now excited to acquire Scala a pre-seed fund from Colombia to help us build our vision around venture capital for the Latin America region. <br/><br/></div>
                    </div>
                 </div>
              </div>
           </div>

           <div class="timeline-container">
           <ul>
               <li style="--accent-color:#181a08">
                   <div class="date">January 2019</div>
                   <div class="title">A Spectacular Beginning</div>
                   <div class="descr">Buildup Camp, a Startup Academy launches in The Netherlands</div>
               </li>
               <li style="--accent-color:#181a08">
                   <div class="date">February 2020</div>
                   <div class="title">Igniting Innovation</div>
                   <div class="descr">Acanof, a Data-Driven Accelerator launches in LatAm</div>
               </li>
               <li style="--accent-color:#181a08">
                   <div class="date">September 2021</div>
                   <div class="title">Unleashing Potential</div>
                   <div class="descr">Pygma is formed as a merger from Buildup Camp & Acanof</div>
               </li>
               <li style="--accent-color:#181a08">
                   <div class="date">May 2022</div>
                   <div class="title">Opening New Doors</div>
                   <div class="descr">Our Pre-seed Accelerator opens it's doors</div>
               </li>
               <li style="--accent-color:#181a08">
                   <div class="date">July 2022</div>
                   <div class="title">Expanding Horizons</div>
                   <div class="descr">Pygma acquires Scala, a pre-seed fund with 12 investments in the Latin America region</div>
               </li>
           </ul>
           </div>

           <div class="section wf-section">
              <div class="main-container-py1">
                 <div class="section-title text-center">
                    <h3 class="medium-heading no-bottom-margin">Our team of change makers</h3>
                 </div>
                 <div class="w-layout-grid team-grid">
                    <div data-w-id="ef02e9ff-ff48-6d72-7b2f-4f9d8f2f13cf" class="justify-content-center">
                       <img src="https://uploads-ssl.webflow.com/62b5885d8fac366b2aac4228/640e2dbfaa58d3a43b62c364_Andres%20Cano%20-%20Pygma%20Founder.jpeg"  sizes="(max-width: 479px) 4px, 1vw" alt="" class="team-avatar"/>
                       <h5>Andres Cano</h5>
                       <div class="small-text">Co-founder, CEO</div>
                       <a href="https://www.linkedin.com/in/acanof/" target="_blank" class="linkedinteam w-inline-block"><img src="https://uploads-ssl.webflow.com/62b5885d8fac366b2aac4228/62b5885d8fac366824ac4289_icon-LinkedIn-white.svg" loading="lazy" alt=""/></a>
                    </div>
                    <div data-w-id="ef02e9ff-ff48-6d72-7b2f-4f9d8f2f13d5" class="justify-content-center">
                       <img src="https://uploads-ssl.webflow.com/62b5885d8fac366b2aac4228/640e2dbf81a764bccb892bca_Andres%20Campo.jpeg" sizes="(max-width: 479px) 4px, 1vw" alt="" class="team-avatar"/>
                       <h5>Andres Campo</h5>
                       <div class="small-text">Co-founder, CPO</div>
                       <a href="https://www.linkedin.com/in/startupsgrowth/" target="_blank" class="linkedinteam w-inline-block"><img src="https://uploads-ssl.webflow.com/62b5885d8fac366b2aac4228/62b5885d8fac366824ac4289_icon-LinkedIn-white.svg" loading="lazy" alt=""/></a>
                    </div>
                    <div data-w-id="ef02e9ff-ff48-6d72-7b2f-4f9d8f2f13db" class="justify-content-center">
                       <img src="https://uploads-ssl.webflow.com/62b5885d8fac366b2aac4228/62b6d2283d21d0c06d6d6092_Pygma%20team%20-%20Cristina%20Quijano.jpg" sizes="(max-width: 479px) 4px, 1vw" alt="" class="team-avatar"/>
                       <h5>Cristina Quijano</h5>
                       <div class="small-text">Co-founder, CMO</div>
                       <a href="https://www.linkedin.com/in/cristinaquijanop/" target="_blank" class="linkedinteam w-inline-block"><img src="https://uploads-ssl.webflow.com/62b5885d8fac366b2aac4228/62b5885d8fac366824ac4289_icon-LinkedIn-white.svg" loading="lazy" alt=""/></a>
                    </div>
                    <div data-w-id="ef02e9ff-ff48-6d72-7b2f-4f9d8f2f13e1" class="justify-content-center">
                       <img src="https://uploads-ssl.webflow.com/62b5885d8fac366b2aac4228/640e2dbfc374bc6e94c9c9ef_Daniel%20Ospina.jpeg"  sizes="(max-width: 479px) 97vw, 168px" alt="" class="team-avatar"/>
                       <h5>Daniel Ospina</h5>
                       <div class="small-text">Co-founder, CIO</div>
                       <a href="https://www.linkedin.com/in/daniel-ospina-e/" target="_blank" class="linkedinteam w-inline-block"><img src="https://uploads-ssl.webflow.com/62b5885d8fac366b2aac4228/62b5885d8fac366824ac4289_icon-LinkedIn-white.svg" loading="lazy" alt=""/></a>
                    </div>
                    <div data-w-id="353ac77e-019a-fb3c-5e83-52efd9b05c35" style="opacity:0;-webkit-transform:translate3d(0, 21px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-moz-transform:translate3d(0, 21px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-ms-transform:translate3d(0, 21px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);transform:translate3d(0, 21px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)" class="justify-content-center">
                       <img src="https://uploads-ssl.webflow.com/62b5885d8fac366b2aac4228/62b6d227bbb0250e59ae615b_Pygma%20team%20-%20Emilia%20Gonza%CC%81lez.jpg"  sizes="(max-width: 479px) 4px, 1vw" alt="" class="team-avatar"/>
                       <h5>Emilia Gonzalez</h5>
                       <div class="small-text">Head of Legal</div>
                       <a href="https://www.linkedin.com/in/emilia-gonzalez-casabianca/" target="_blank" class="linkedinteam w-inline-block"><img src="https://uploads-ssl.webflow.com/62b5885d8fac366b2aac4228/62b5885d8fac366824ac4289_icon-LinkedIn-white.svg" loading="lazy" alt=""/></a>
                    </div>
                    <div data-w-id="ef02e9ff-ff48-6d72-7b2f-4f9d8f2f13e7" class="justify-content-center">
                       <img src="https://uploads-ssl.webflow.com/62b5885d8fac366b2aac4228/62cbc944e81984d13fc61544_Pygma%20Team%20-%20Yenni%20Pen%CC%83a.jpeg" sizes="(max-width: 479px) 97vw, 168px" alt="" class="team-avatar"/>
                       <h5>Yenni Peña</h5>
                       <div class="small-text">Head of Operations</div>
                       <a href="https://www.linkedin.com/in/yennipm/" target="_blank" class="linkedinteam w-inline-block"><img src="https://uploads-ssl.webflow.com/62b5885d8fac366b2aac4228/62b5885d8fac366824ac4289_icon-LinkedIn-white.svg" loading="lazy" alt=""/></a>
                    </div>
                    <div data-w-id="54a062f1-a9c4-a8c0-d3c9-8a0c4a9cfb8a" class="justify-content-center">
                       <img src="https://uploads-ssl.webflow.com/62b5885d8fac366b2aac4228/638d161c95fb433fd94ae73e_Jai%CC%84r%20Halevi%20-%20Pygma%20team%2C%20Head%20of%20Culture.jpg" alt="" class="team-avatar"/>
                       <h5>Jaīr Halevi</h5>
                       <div class="small-text">Head of Culture</div>
                       <a href="https://www.linkedin.com/in/jairhalevi/" target="_blank" class="linkedinteam w-inline-block"><img src="https://uploads-ssl.webflow.com/62b5885d8fac366b2aac4228/62b5885d8fac366824ac4289_icon-LinkedIn-white.svg" loading="lazy" alt=""/></a>
                    </div>
                    <div data-w-id="ef02e9ff-ff48-6d72-7b2f-4f9d8f2f13ed" style="opacity:0;-webkit-transform:translate3d(0, 21px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-moz-transform:translate3d(0, 21px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-ms-transform:translate3d(0, 21px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);transform:translate3d(0, 21px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)" class="justify-content-center">
                       <img src="https://uploads-ssl.webflow.com/62b5885d8fac366b2aac4228/62b6d227d00c8843e2293ed3_Pygma%20team%20-%20Luis%20Ortega.jpg" sizes="(max-width: 479px) 4px, 1vw" alt="" class="team-avatar"/>
                       <h5>Luis Ortega</h5>
                       <div class="small-text">Head of Business Intelligence</div>
                       <a href="https://www.linkedin.com/in/lort17/" target="_blank" class="linkedinteam w-inline-block"><img src="https://uploads-ssl.webflow.com/62b5885d8fac366b2aac4228/62b5885d8fac366824ac4289_icon-LinkedIn-white.svg" loading="lazy" alt=""/></a>
                    </div>
                    <div data-w-id="6f685866-01f5-e705-8549-1f05889fbf19" style="opacity:0;-webkit-transform:translate3d(0, 21px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-moz-transform:translate3d(0, 21px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-ms-transform:translate3d(0, 21px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);transform:translate3d(0, 21px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)" class="justify-content-center">
                       <img src="https://uploads-ssl.webflow.com/62b5885d8fac366b2aac4228/62b6d2271408ab6b1ff62846_Pygma%20team%20-%20Mishelle%20Ramirez.jpg" sizes="(max-width: 479px) 4px, 1vw" alt="" class="team-avatar"/>
                       <h5>Mishelle Ramirez</h5>
                       <div class="small-text">Product Operations</div>
                       <a href="https://www.linkedin.com/in/mishelle-ramirez-figueroa-438270203/" target="_blank" class="linkedinteam w-inline-block"><img src="https://uploads-ssl.webflow.com/62b5885d8fac366b2aac4228/62b5885d8fac366824ac4289_icon-LinkedIn-white.svg" loading="lazy" alt=""/></a>
                    </div>
                    <div data-w-id="8fc2e707-cfdc-9d72-928d-3bbad05c0e4c" style="opacity:0;-webkit-transform:translate3d(0, 21px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-moz-transform:translate3d(0, 21px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-ms-transform:translate3d(0, 21px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);transform:translate3d(0, 21px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)" class="justify-content-center">
                       <img src="https://uploads-ssl.webflow.com/62b5885d8fac366b2aac4228/640e2dbfbc45fd611048d4b4_Alejandro%20Lopez.jpeg" sizes="(max-width: 479px) 97vw, 168px" alt="" class="team-avatar"/>
                       <h5><strong>Alejandro Lopez</strong></h5>
                       <div class="small-text">Growth Marketing Manager</div>
                       <a href="https://www.linkedin.com/in/alejandrolopez-marketing/" target="_blank" class="linkedinteam w-inline-block"><img src="https://uploads-ssl.webflow.com/62b5885d8fac366b2aac4228/62b5885d8fac366824ac4289_icon-LinkedIn-white.svg" loading="lazy" alt=""/></a>
                    </div>
                    <div data-w-id="2662edc8-e7b2-fc93-d119-9365619c55ef" style="opacity:0;-webkit-transform:translate3d(0, 21px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-moz-transform:translate3d(0, 21px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-ms-transform:translate3d(0, 21px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);transform:translate3d(0, 21px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)" class="justify-content-center">
                       <img src="https://uploads-ssl.webflow.com/62b5885d8fac366b2aac4228/640e2e82afb7250019486af0_Nicolas%20Restrepo.jpeg" sizes="(max-width: 479px) 4px, 1vw" alt="" class="team-avatar"/>
                       <h5><strong>Nicolas Restrepo</strong></h5>
                       <div class="small-text">Customer Success</div>
                       <a href="https://www.linkedin.com/in/nicolas-restrepo-bustamante/" target="_blank" class="linkedinteam w-inline-block"><img src="https://uploads-ssl.webflow.com/62b5885d8fac366b2aac4228/62b5885d8fac366824ac4289_icon-LinkedIn-white.svg" loading="lazy" alt=""/></a>
                    </div>
                    <div data-w-id="62a9222b-b43a-d2f1-e9ba-7b0ab2b0eff2" style="opacity:0;-webkit-transform:translate3d(0, 21px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-moz-transform:translate3d(0, 21px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-ms-transform:translate3d(0, 21px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);transform:translate3d(0, 21px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)" class="justify-content-center">
                       <img src="https://uploads-ssl.webflow.com/62b5885d8fac366b2aac4228/6363dc968becb8e25e231429_1664925875593%20(1).jpeg" sizes="(max-width: 479px) 97vw, 168px" alt="" class="team-avatar"/>
                       <h5><strong>Sebastian García</strong></h5>
                       <div class="small-text">Business Development</div>
                       <a href="https://www.linkedin.com/in/sebasti%C3%A1n-garc%C3%ADa-lobo-19b93b215/" target="_blank" class="linkedinteam w-inline-block"><img src="https://uploads-ssl.webflow.com/62b5885d8fac366b2aac4228/62b5885d8fac366824ac4289_icon-LinkedIn-white.svg" loading="lazy" alt=""/></a>
                    </div>
                 </div>
              </div>
           </div>
           <div class="section jobs wf-section">
              <div class="main-container-py1 job-posting">
                 <div class="w-layout-grid grid-halves jobpost">
                    <div class="container-small">
                       <div class="icon-title">
                          <div class="icon-square"><img src="https://uploads-ssl.webflow.com/62b5885d8fac366b2aac4228/62b5885d8fac36518dac42ba_icon-people.svg" alt=""/></div>
                          <h5 class="icon-horizontal-heading">Careers</h5>
                       </div>
                       <h4 class="medium-heading">Join a remote team of ecosystem builders.</h4>
                       <div>Pygmalions are people with a burning desire to build the future of the LatAm region. You must be obsessed about startups, open to helping others and a little bit crazy to join our team. </div>
                       <div class="button-row positiongs">
                          <a href="/careers" class="button icon-button pygmagreen w-inline-block">
                             <div class="pygmatext">See open positions</div>
                          </a>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
           <div class="section wf-section">
              <div class="main-container-py1">
                 <div class="section-title">
                    <h3 class="no-bottom-margin">From the blog</h3>
                 </div>
                 <div class="w-dyn-list">
                    <div role="list" class="cms-grid w-dyn-items">
                       <div role="listitem" class="w-dyn-item">
                          <a href="/post/startup-valuation-8-methods-to-valuate-your-startup" class="cms-item-link w-inline-block">
                             <img src="https://uploads-ssl.webflow.com/62b5885d8fac36c8ddac4239/6463b2f7e424b654ed21e137_Startup%20Valuation%20-%20Pygma.png" alt="Startup Valuation: 8 methods to valuate your startup " sizes="(max-width: 479px) 100vw, (max-width: 767px) 87vw, (max-width: 1279px) 44vw, 508px"  class="blog-thumbnail"/>
                             <div class="cms-item-body">
                                <h4>Startup Valuation: 8 methods to valuate your startup </h4>
                                <div class="cms-item-meta">
                                   <div class="text-white">Startups</div>
                                   <div class="blog-post-date">September 13, 2022</div>
                                </div>
                             </div>
                          </a>
                       </div>
                       <div role="listitem" class="w-dyn-item">
                          <a href="/post/startup-glossary" class="cms-item-link w-inline-block">
                             <img src="https://uploads-ssl.webflow.com/62b5885d8fac36c8ddac4239/64594fc63e14023d1cb02a1f_Startup%20glossary%20-%20Pygma.jpg" alt="Startup Glossary" sizes="(max-width: 479px) 100vw, (max-width: 767px) 87vw, (max-width: 1279px) 44vw, 508px" class="blog-thumbnail"/>
                             <div class="cms-item-body">
                                <h4>Startup Glossary</h4>
                                <div class="cms-item-meta">
                                   <div class="text-white">Startups</div>
                                   <div class="blog-post-date">September 13, 2022</div>
                                </div>
                             </div>
                          </a>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
        <div style="opacity:0" class="load-third">
           <div class="footer wf-section">
              <div class="main-container-py1 div-block-554">
                 <div class="w-layout-grid footer-grid">
                    <div>
                       <a href="#" class="footer-logo-link w-inline-block"><img src="https://uploads-ssl.webflow.com/62b5885d8fac366b2aac4228/640de252ba6752ae8707bf71_Asset%2011%404x.png" width="188" alt=""/></a>
                       <div class="w-layout-grid vertical-link-grid">
                          <a href="https://www.linkedin.com/company/pygmavc/" target="_blank" class="social-link w-inline-block">
                             <img src="https://uploads-ssl.webflow.com/62b5885d8fac366b2aac4228/62b5885d8fac366824ac4289_icon-LinkedIn-white.svg" alt="" class="social-link-icon"/>
                             <div>LinkedIn</div>
                          </a>
                          <a href="https://twitter.com/wearepygma" target="_blank" class="social-link w-inline-block">
                             <img src="https://uploads-ssl.webflow.com/62b5885d8fac366b2aac4228/62b5885d8fac365712ac4291_icon-Twitter-white.svg" alt="" class="social-link-icon"/>
                             <div>Twitter</div>
                          </a>
                          <a href="https://www.instagram.com/wearepygma/" target="_blank" class="social-link w-inline-block">
                             <img src="https://uploads-ssl.webflow.com/62b5885d8fac366b2aac4228/62b5885d8fac36a4faac428f_icon-Instagram-white.svg" alt="" class="social-link-icon"/>
                             <div>Instagram</div>
                          </a>
                          <a href="https://open.spotify.com/show/7jKGWoL1uFe4KPb61mES4H?si=phOyP3BwRHCdIE5WlZOdQw" target="_blank" class="social-link w-inline-block">
                             <img src="https://uploads-ssl.webflow.com/62b5885d8fac366b2aac4228/62c40d564a8cc502c745d160_Pygma%20Podcast%20-%20Spotify%20.png" width="24" alt="" class="social-link-icon"/>
                             <div>Spotify </div>
                          </a>
                       </div>
                    </div>
                    <div>
                       <h5 class="footer-heading">Resources</h5>
                       <div class="w-layout-grid vertical-link-grid"><a href="/startup-blog" class="hover-link">Blog</a><a href="/startup-podcast" class="hover-link">Podcast</a><a href="https://discord.gg/wda8wqZSxK" class="hover-link">Discord Community</a><a href="/contact" class="hover-link">Contact Us</a></div>
                    </div>
                 </div>
                 <div class="footer-bottom-row">
                    <div>© All rights reserved by Pygma. Made with ❤️ for LatAm</div>
                 </div>
              </div>
           </div>
        </div>
        <div class="loading-container"><img src="https://uploads-ssl.webflow.com/62b5885d8fac366b2aac4228/62b5885d8fac369371ac4328_loader.svg" loading="eager" alt="" class="loader"/></div>
        <div class="search-modal">
           <div class="search-modal-screen"></div>
           <div class="search-modal-container">
              <form action="/search" class="horizontal-form w-form"><input type="search" class="form-input adjacent-to-button w-input" autofocus="true" maxlength="256" name="query" placeholder="Type keywords" id="search" required=""/><input type="submit" value="Search" class="button adjacent-to-input w-button"/></form>
           </div>
        </div>
        <script src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=62b5885d8fac366b2aac4228" type="text/javascript" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script><script src="https://uploads-ssl.webflow.com/62b5885d8fac366b2aac4228/js/webflow.cabc407b3.js" type="text/javascript"></script>
     </body>
  </html>
  `
  return (
    <>
        <Head>
          <title>Apply to batch | Pygma</title>
        </Head>
        <Box
          component="main"
          sx={{
            py: PADDING_TOP,
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <iframe
            srcdoc= {aboutHTMLPage}
            title="Apply to Batch"
            width="100%"
            height="100%"
            allowtransparency="true"
            allowfullscreen="true"
            scrolling="hidden"
            frameBorder="0"
          />
        </Box>
      </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
