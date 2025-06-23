// Content data
const personal_details = {
  codeName: "HPC SPECIALIST | FUNDAMENTAL RESEARCH",
  currentLocation: "CANADA",
  email: "hello@tbritt.xyz",
};

const current_focus = {
  paragraphOne:
    "As a doctor of physics, my research focused on high performance computation, and the optimization of advanced quantum mechanical simulations, affording me with in-depth technical knowledge of a wide range of physical, algorithmic, and mathematical principles and innovations. Over my career, I have developed research-grade proficiency in Rust, C++, Fortran, and Python, and I have used these tools for a range of applications. My research at times involves the collection of extensive (~TB) datasets, and the efficient use of supercomputing resources, such as MPI, OpenMP,Tokio/Rayon, and CUDA, to extract and analyse the relevant information from the resulting data.",
  paragraphTwo:
    "My abilities to utilise cutting-edge technology, to analyse and successfully execute solutions to complex problems, and my strong willingness to collaborate with my peers poises me as successful researcher.",
  paragraphThree:
    "I currently focus my research on cryptography, atomic and statistical arbitrage, convex optimization, and network / graph theory.",
};

const projects = [
  {
    code: "ALPHA",
    title: "Sylow",
    description:
      "Sylow (ˈsyːlɔv) is a comprehensive Rust library for elliptic curve cryptography, specifically tailored for the BN254 ( alt-bn128) curve.",
    location: "Fintech Sector",
    detailedDescription:
      "Sylow (ˈsyːlɔv) is a comprehensive Rust library for elliptic curve cryptography, specifically tailored for the BN254 ( alt-bn128) curve. It provides a robust implementation of finite fields, elliptic curve groups, and pairing-based cryptography, making it an ideal choice for applications in blockchain, zero-knowledge proofs, and other cryptographic systems.",
    technologies: ["Cryptography", "SecOps", "HPC", "Rust"],
    duration: "6 months",
    role: "Lead Architect and Developer",
    image: "/sylow.png",
    achievements: [
      "Sub 6 ms optimal ate pairing time",
      "No critical vulnerabilities in Rust or Solidity implementations as reported by Zellic and Least Authority audits",
      "Awarded an Arbitrum Stylus Grant for the Stylus SDK of $700k ARB",
    ],
    externalLink: "https://github.com/warlock-labs/sylow/tree/main",
  },
  {
    code: "BRAVO",
    title: "A momentum-resolved view of polaron formation in materials",
    description:
      "An ab-initio computational methodology for interrogating the phonon contribution to polaron formation in real materials is developed that can be directly compared to experiment.",
    location: "Academia",
    detailedDescription:
      "An ab-initio computational methodology for interrogating the phonon contribution to polaron formation in real materials is developed that can be directly compared to experiment. Using LiF as an example, we show that the recent ab-initio theory of Sio et. al [PRL 122, 246403 (2019)] makes predictions of the momentum- and branch dependent phonon amplitudes in polaron quasiparticles that are testable using ultrafast electron diffuse scattering (UEDS) and related techniques. The large electron polaron in LiF has UEDS signatures that are qualitatively similar to those expected from a simple isotropic strain field model, but the small hole polaron exhibits a profoundly anisotropic UEDS pattern that is in poor agreement with an isotropic strain field. We also show that these polaron diffuse scattering signatures are directly emblematic of the underlying polaron wavefunction.  The combination of new time and momentum resolved experimental probes of nonequilibrium phonons with novel computational methods promises to complement the qualitative results obtained via model Hamiltonians with a first principles, material-specific quantitative understanding of polarons and their properties.",
    technologies: ["Fortran", "C++", "Python", "Fundamental Research"],
    duration: "1 year",
    role: "Lead Researcher",
    image: "/npjcomp_mat.png",
    achievements: [],
    externalLink: "https://www.nature.com/articles/s41524-024-01",
  },
  {
    code: "CHARLIE",
    title:
      "Ultrafast phonon diffuse scattering as a tool for observing chiral phonons in monolayer hexagonal lattices",
    description:
      "Developped the theoretical framework to directly observe chiral phonon emission experimentally.",
    location: "Academia",
    detailedDescription:
      "At the 2D limit, hexagonal systems such as monolayer transition metal dichalcogenides (TMDs) and graphene exhibit unique coupled spin and momentum-valley physics (valley pseudospin) owing to broken spatial inversion symmetry and strong spin-orbit coupling. Circularly polarized light provides the means for pseudospin-selective excitation of excitons (or electrons and holes) and can yield momentum-valley polarized populations of carriers that are the subject of proposed valleytronic applications. The chirality of these excited carriers have important consequences for the available relaxation/scattering pathways, which must conserve (pseudo)angular momentum as well as energy. One available relaxation channel that satisfies these constraints is coupling to chiral phonons. Here, we show that chiral carrier-phonon coupling following valley-polarized photoexcitation is expected to lead to a strongly valley-polarized chiral phonon distribution when this relaxation mechanism is dominant. This momentum valley phonon polarization is directly measurable using ultrafast phonon diffuse scattering techniques.",
    technologies: ["Fortran", "Python", "Fundamental Research"],
    duration: "1 year",
    role: "Lead Researcher",
    image: "/prb.png",
    achievements: [],
    externalLink:
      "https://journals.aps.org/prb/abstract/10.1103/PhysRevB.107.214306",
  },
  {
    code: "DELTA",
    title: "Ultrafast phonon dynamics in atomically thin MoS2",
    description:
      "The first observation of finite-momentum phonon dynamics in a 2D material, with novel theoretical developments explaining experimental observation.",
    location: "Academia",
    detailedDescription:
      "Transition metal dichalcogenide monolayers and heterostructures are highly tunable material systems that provide excellent models for physical phenomena at the two-dimensional (2D) limit. While most studies to date have focused on electrons and electron-hole pairs, phonons also play essential roles. Here, we apply ultrafast electron diffraction and diffuse scattering to directly quantify, with time and momentum resolution, electron-phonon coupling (EPC) in monolayer molybdenum disulfide and phonon transport from the monolayer to a silicon nitride substrate.",
    technologies: [
      "D3.js",
      "React",
      "Redux",
      "Node.js",
      "WebSockets",
      "MongoDB",
    ],
    duration: "2 years",
    role: "Lead Researcher",
    image: "/nanolett.png",
    achievements: [],
    externalLink: "https://pubs.acs.org/doi/10.1021/acs.nanolett.2c00850",
  },
];

// Professional experience data
const experiences = [
  {
    code: "FOXTROT",
    title: "Head of Research",
    description: "Led cryptoeconomics research and design",
    location: "Warlock Labs",
    detailedDescription:
      "Leading the research division in researching, developing, and implementing technical algorithmic strategies in cryptography, convex optimization, network theory, and more.",
    technologies: ["Rust", "Ethereum Mainnet", "Cryptography", "DeFi"],
    duration: "December 2024 - Present",
    image: "/sylow.png",
    achievements: [],
  },
  {
    code: "GOLF",
    title: "Senior Research Engineer",
    description: "Led cryptoeconomics research and design",
    location: "Warlock Labs",
    detailedDescription:
      "Performing research and developing strategies on reintermediating MEV and OEV, developing novel statistical and atomic arbitrage strategies, liquidation detection, and cutting-edge cryptography research",
    technologies: ["Rust", "Ethereum Mainnet", "Cryptography", "DeFi"],
    duration: "June 2024 - December 2024",
    image: "/sylow.png",
    achievements: [],
  },
  {
    code: "HOTEL",
    title: "Product Developer",
    description:
      "Created responsive and accessible visual programming interfaces",
    location: "Flojoy",
    detailedDescription:
      "Providing industry and research perspective on best practices and features for realistic customer use as a replacement of LabVIEW",
    technologies: ["Python", "FastAPI", "Redis", "C++"],
    duration: "Jan 2023 - June 2024",
    image: "/flojoy.png",
    achievements: [],
  },
  {
    code: "INDIA",
    title: "Research Assistant",
    description:
      "Contributed to multiple projects of the Superconducting Magnet Division",
    location: "Brookhaven National Laboratory",
    detailedDescription:
      "Designed the dipole magnet currently used in the Low Energy election Cooling Beamline upgrade to the Relativistic Heavy Ion Collider (RHIC) to reduce power used cooling relativistic particles by >30%, and Designed and simulated the measurement magnet currently used in the High Luminosity upgrade to the Large Hadron Collider (HL-LHC) at CERN, Switzerland, aﬀording > 20% increase in magnetic sensitvity",
    technologies: ["Opera", "Roxy", "C++", "Python"],
    duration: "March 2018 - August 2018",
    image: "/BNL.png",
    achievements: [],
  },
  {
    code: "JASPER",
    title: "Research Assistant",
    description:
      "Contributed to multiple projects of the Center for Axion Precision Physics",
    location: "Korea Advanced Institute of Science and Technology",
    detailedDescription:
      "Designed, simulated, and manufactured a high Q-factor RF cavity for cryogenic use in the global Axion Dark Matter eXperiment (ADMX) collaboration, with participants in Korea, USA, and at CERN, Switzerland",
    technologies: ["Comsol", "Ansys", "C++", "Python"],
    duration: "June 2017 - August 2017",
    image: "/KAIST.png",
    achievements: [],
  },
];

// Education data
const education = [
  {
    code: "JULIET",
    title: "Doctorate of Physics",
    description:
      "Specialized in Theoretical and Experimental Condensed Matter Physics",
    location: "McGill University",
    detailedDescription:
      "Completed my doctorate on the thesis of developing novel theoretical and computational approaches to understand 2D materials through the lens of electron diffuse scattering.",
    duration: "2021 - 2024",
    degree: "Ph.D.",
    achievements: [
      "Summa Cum Laude",
      "Invited peer reviewer for a collection of Nature journals",
      "Fully funded for the duration of the research through provincial excellence grant",
    ],
  },
  {
    code: "KILO",
    title: "Bachelor of Science in Physics",
    description: "Focused on mathematical physics and computational approaches",
    location: "Indiana University",
    detailedDescription:
      "Earned a BS degree with Honors in physics, focusing specifically on computational techniques and theoretical ideas to compute unknown quantities.",
    duration: "2015 - 2019",
    degree: "B.S. Physics",
    achievements: ["Dean's List all semesters", "Graduated Summa Cum Laude"],
  },
  {
    code: "LIMA",
    title: "Bachelor of Science in Applied Mathematics",
    description: "Focused on mathematical physics and computational approaches",
    location: "Indiana University",
    detailedDescription:
      "Earned a BS degree in applied mathematics, focusing specifically on analytics and computational differential geometry with applications in field theory and algebra.",
    duration: "2015-2019",
    achievements: ["Dean's List all semesters", "Graduated Summa Cum Laude"],
  },
];

const skills = {
  programming_languages: ["Rust", "Python", "Fortran", "C++"],
  frameworks: [
    "UNIX (Ubuntu, CentOS, MacOS)",
    "ZFS",
    "HDF5",
    "OpenMP",
    "MPI",
    "Cuda",
    "Tokio",
    "Rayon",
  ],
  devops: ["Docker", "S3", "CI/CD", "Kubernetes", "Codspeed"],
  other: ["UI/UX Design", "System Architecture", "HPC Optimization", "FPGA"],
};


// Social media links
const social_links = [
    {
      name: "GitHub",
      icon: "github.png",
      url: "https://github.com/trbritt",
      hoverText: "View Code Repositories"
    },
    {
      name: "LinkedIn",
      icon: "linkedin.png",
      url: "https://linkedin.com/in/trbritt",
      hoverText: "Professional Network"
    },
    {
      name: "ORCID",
      icon: "orcid.png",
      url: "https://orcid.org/0000-0002-2617-8857",
      hoverText: "Academic Publications"
    }
  ];


export {
  skills,
  experiences,
  education,
  projects,
  personal_details,
  current_focus,
  social_links
};
