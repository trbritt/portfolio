import {
    backend,
    creator,
    web,
    javascript,
    typescript,
    html,
    css,
    reactjs,
    git,
    docker,
    python,
    C,
    Cpp,
    fortran,
    linux,
    mcgill,
    orcid,
    linkedin,
    github,
    IU,
    KAIST,
    BNL,
    threejs,
    nanolett,
    prr,
    mst
  } from "../assets";
  
  export const navLinks = [
    {
      id: "about",
      title: "About",
    },
    {
      id: "work",
      title: "Work",
    },
    {
      id: "FAQ",
      title: "FAQ"
    },
    {
      id: "contact",
      title: "Contact",
    },

  ];

  const faqs = [
    {
      question: "How did you get into physics?",
      response: "My grandfather was a nuclear physicist in the US and UK, and so he gave me inspiration growing up. Once I developed an appreciation for being able to understand how <i>everything</i> (more or less) worked with physics, it was game over!"
    },
    {
      question: "What simulation suites do you have experience in?",
      response: "Over the years, I've developed experience in simulating a range of physical systems: heat transport, relativistic electron beams, charge transport, ultrafast phonon scattering, RF cavities, etc. They've relied on commercial products like COMSOL, ANSYS, and GPT, as well has home grown simulation suites."
    },
    {
      question: "What is your favourite programming language?",
      response: "What a hard question! Data science and ultrafast phenomena have occupied my last couple of years, so for now I have to say Fortran for the heavy duty number crunching (thanks Quantum Espresso), and Python for the visualization. But as you can see, Javascript made this website so... ;)"
    }
  ];
  
  const services = [
    {
      title: "Ultrafast Dynamics Simulation Developer",
      icon: web,
    },
    {
      title: "Linux Developer",
      icon: linux,
    },
    {
      title: "React Developer",
      icon: backend,
    },
    {
      title: "Electron beamline Operator",
      icon: creator,
    },
  ];
  const social_links = [
    {
      title: "Github",
      icon: github,
      source_code_link: "https://github.com/trbritt",

    },
    {
      title: "ORCID",
      icon: orcid,
      source_code_link: "https://orcid.org/0000-0002-2617-8857",

    },
    {
      title: "LinkedIn",
      icon: linkedin,
      source_code_link: "https://www.linkedin.com/in/tristan-britt-282313112/",

    },
  ];
  
  const technologies = [
    {
      name: "Python",
      icon: python,
    },{
      name: "C",
      icon: C,
    },{
      name: "Cpp",
      icon: Cpp,
    },{
      name: "Fortran",
      icon: fortran,
    },{
      name: "Linux",
      icon: linux,
    },    
    {
      name: "HTML 5",
      icon: html,
    },
    {
      name: "CSS 3",
      icon: css,
    },
    {
      name: "JavaScript",
      icon: javascript,
    },
    {
      name: "TypeScript",
      icon: typescript,
    },
    {
      name: "React JS",
      icon: reactjs,
    },
    {
      name: "Three JS",
      icon: threejs,
    },
    {
      name: "git",
      icon: git,
    },
    {
      name: "docker",
      icon: docker,
    },

  ];
  
  const experiences = [
    {
      title: "Research Assistant",
      company_name: "Korea Advanced Institute of Science and Technology",
      icon: KAIST,
      iconBg: "#E6DEDD",
      date: "March 2017 - August 2017",
      points: [
        "Dilusion refrigerator operation",
        "Cryogenic RF cavity design",
        "SQUID implementations",
        "COMSOL simulation"
      ],
    },
    {
      title: "Research Assistant",
      company_name: "Brookhaven National Lab",
      icon: BNL,
      iconBg: "#E6DEDD",
      date: "March 2018 - August 2018",
      points: [
        "OPERA cryogenic magnet design",
        "LEReC beamline design",
        "eRHIC target development",
      ],
    },
    {
      title: "B.Sc. with Summa Cum Laude",
      company_name: "Indiana University",
      icon: IU,
      iconBg: "#E6DEDD",
      date: "May 2019",
      points: [
        "B.S. degrees in both Physics and Applied Mathematics.",
        "Neutron interferometry experiments",
        "Experimental fiber bundle computations"
      ],
    },
    {
      title: "PhD Candidate",
      company_name: "McGill University",
      icon: mcgill,
      iconBg: "#E6DEDD",
      date: "Jan 2021 - Present",
      points: [
        "Finite-element FDTD simulation design",
        "Relativistic space-charge electron beamline design and optimization",
        "Simulation and development of time-resolved electron energy loss spectroscopy (trEELS)",
        "Simulation and first-time realization of inelastic phonon-diffuse scattering on 2D materials",
      ],
    },
  ];
  
  const projects = [
    {
      name: "Ultrafast phonon dynamics in atomically thin MoS2",
      description:
        "Transition metal dichalcogenide monolayers and heterostructures are highly tunable material systems that provide excellent models for physical phenomena at the two-dimensional (2D) limit. While most studies to date have focused on electrons and electron-hole pairs, phonons also play essential roles. Here, we apply ultrafast electron diffraction and diffuse scattering to directly quantify, with time and momentum resolution, electron-phonon coupling (EPC) in monolayer molybdenum disulfide (MoS$_2$) and phonon transport from the monolayer to a silicon nitride (Si$_3$N$_4$) substrate.",
      tags: [
        {
          name: "phonons",
          color: "blue-text-gradient",
        },
        {
          name: "monolayers",
          color: "green-text-gradient",
        },
        {
          name: "density functional theory",
          color: "pink-text-gradient",
        },
      ],
      image: nanolett,
      source_code_link: "https://pubs.acs.org/doi/10.1021/acs.nanolett.2c00850",
    },
    {
      name: "Extreme lightwave electron field emission from a nanotip",
      description:
        "We report on subcycle terahertz light-field emission of electrons from tungsten nanotips under extreme conditions corresponding to a Keldysh parameter γ≈$10^{-4}$. Local peak THz fields up to 40 GV/m are achieved at the apex of an illuminated nanotip, causing subcycle cold-field electron emission and acceleration in the quasistatic field. By simultaneous measurement of the electron bunch charge and energy distribution, we perform a quantitative test of quasistatic Fowler-Nordheim tunneling theory under field conditions that completely suppress the tunnel barrier. Very high bunch charges of ~$10^6$ electrons/pulse are observed, reaching maximum energies of 3.5 keV after acceleration in the local field.",
      tags: [
        {
          name: "electrons",
          color: "blue-text-gradient",
        },
        {
          name: "fdtd",
          color: "green-text-gradient",
        },
        {
          name: "beamline",
          color: "pink-text-gradient",
        },
      ],
      image: prr,
      source_code_link: "https://journals.aps.org/prresearch/abstract/10.1103/PhysRevResearch.3.013137",
    },
    {
      name: "High-precision magnetic field measurement and mapping of the LEReC 180° bending magnet using very low field NMR with Hall combined probe (140-350 G)",
      description:
        "The relativistic heavy ion collider (RHIC) at BNL uses low-energy RHIC electron cooling (LEReC) to conduct experiments to search for the quantum chromodynamic critical point. The first ever electron cooling based on the RF acceleration of electron beams was experimentally demonstrated on April 5, 2019 using LEReC at BNL. ",
      tags: [
        {
          name: "opera",
          color: "blue-text-gradient",
        },
        {
          name: "eRHIC",
          color: "green-text-gradient",
        },
        {
          name: "LEReC",
          color: "pink-text-gradient",
        },
      ],
      image: mst,
      source_code_link: "https://iopscience.iop.org/article/10.1088/1361-6501/ab7ac1",
    },
  ];
  
  export { services, technologies, experiences, projects, social_links, faqs };