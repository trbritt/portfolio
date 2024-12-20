import {
    creator,
    web,
    typescript,
    git,
    python,
    C,
    Cpp,
    fortran,
    go,
    linux,
    mcgill,
    orcid,
    linkedin,
    github,
    IU,
    KAIST,
    BNL,
    nanolett,
    prr,
    mst,
    prb,
    rust,
    solidity,
    prx,
    ethereum,
    flojoy,
    warlock,
    sylow
  } from "../components/assets";
  
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
      id: "contact",
      title: "Contact",
    },
    {
      id: "dissertation",
      title: "Dissertation"
    }

  ];

  const services = [
    {
      title: "Blockchain Researcher",
      icon: ethereum,
    },
    {
      title: "Physicist",
      icon: creator,
    },
    {
      title: "Rust Developer",
      icon: rust,
    },
    {
      title: "C++ Developer",
      icon: Cpp,
    },
    {
      title: "Python Developer",
      icon: python,
    },
    {
      title: "HPC Specialist",
      icon: web,
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
      name: "Rust",
      icon: rust
    },
    {
      name: "Cpp",
      icon: Cpp,
    },
    {
      name: "Linux",
      icon: linux,
    }, 
    {
      name: "Python",
      icon: python,
    },
    {
      name: "Fortran",
      icon: fortran,
    },
    {
      name: "Solidity",
      icon: solidity,
    },
    {
      name: "Golang",
      icon: go,
    },
    {
      name: "C",
      icon: C,
    },
    {
      name: "TypeScript",
      icon: typescript,
    },
    {
      name: "git",
      icon: git,
    },
  ];
  
  const experiences = [
    {
      title: "Head of Research",
      company_name: "Warlock Labs",
      icon: warlock,
      iconBg: "#E6DEDD",
      date: "November 2024 - Present",
      points: [
        "Leading the research division in researching, developing, and implementing technical algorithmic strategies in cryptography, convex optimization, network theory, and more."
      ]
    },
    {
      title: "Senior Research Engineer",
      company_name: "Warlock Labs",
      icon: warlock,
      iconBg: "#E6DEDD",
      date: "June 2024 - November 2024",
      points: [
        "Performing research and developing strategies on reintermediating MEV and OEV, developing novel statistical and atomic arbitrage strategies, liquidation detection, and cutting-edge cryptography research"
      ]
    },
    {
      title: 'Product Developer',
      company_name: "Flojoy",
      icon: flojoy,
      iconBg: "#E6DEDD",
      date: "Jan 2023 - June 2024",
      points: [
        "Providing industry and research perspective on best practices and features for realistic customer use as a replacement of <code className=`bg-zinc-800 text-zinc-300 px-2 rounded py-1 text-sm mx-1`>LabVIEW</code>",
        "Creating custom applications for customers to seamlessly integrate existing and train new highly performant ML models, instrumentation, etc, into the new interface and product"
      ]
    },
    {
      title: "Doctorate in Physics",
      company_name: "McGill University",
      icon: mcgill,
      iconBg: "#E6DEDD",
      date: "Jan 2021 - March 2024",
      points: [
        "Finite-element FDTD simulation design",
        "Relativistic space-charge electron beamline design and optimization",
        "Simulation and development of time-resolved electron energy loss spectroscopy (trEELS)",
        "Simulation and first-time realization of inelastic phonon-diffuse scattering on 2D materials",
        "First direct procedure developed to directly observe chiral phonons in 2D materials",
        "Developed the concept of polaron diffuse scattering"
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
  ];
  
  const projects = [
    {
      name: "Sylow: The Fastest Secure Prover on the Planet for BN254",
      description: "Sylow (ˈsyːlɔv) is a comprehensive Rust library for elliptic curve cryptography, specifically tailored for the BN254 ( alt-bn128) curve. It provides a robust implementation of finite fields, elliptic curve groups, and pairing-based cryptography, making it an ideal choice for applications in blockchain, zero-knowledge proofs, and other cryptographic systems",
      tags: [
        {
          name: "Cryptography",
          color: "blue-text-gradient",
        },
        {
          name: "Elliptic Curve",
          color: "green-text-gradient",
        },
        {
          name: "Zero Knowledge",
          color: "pink-text-gradient",
        },
      ],
      image: sylow,
      source_code_link: "https://github.com/warlock-labs/sylow/tree/main"
    },
    {
      name: "A momentum-resolved view of polaron formation in materials",
      description: "An ab-initio computational methodology for interrogating the phonon contribution to polaron formation in real materials is developed that can be directly compared to experiment. Using LiF as an example, we show that the recent ab-initio theory of Sio et. al [PRL 122, 246403 (2019)] makes predictions of the momentum- and branch dependent phonon amplitudes in polaron quasiparticles that are testable using ultrafast electron diffuse scattering (UEDS) and related techniques. The large electron polaron in LiF has UEDS signatures that are qualitatively similar to those expected from a simple isotropic strain field model, but the small hole polaron exhibits a profoundly anisotropic UEDS pattern that is in poor agreement with an isotropic strain field. We also show that these polaron diffuse scattering signatures are directly emblematic of the underlying polaron wavefunction.  The combination of new time and momentum resolved experimental probes of nonequilibrium phonons with novel computational methods promises to complement the qualitative results obtained via model Hamiltonians with a first principles, material-specific quantitative understanding of polarons and their properties.",
      tags: [
        {
          name: "polarons",
          color: "blue-text-gradient",
        },
        {
          name: "first principles",
          color: "green-text-gradient",
        },
        {
          name: "density functional theory",
          color: "pink-text-gradient",
        },
      ],
      image: prx,
      source_code_link: "https://www.nature.com/articles/s41524-024-01347-x"
    },
    {
      name: "Ultrafast phonon diffuse scattering as a tool for observing chiral phonons in monolayer hexagonal lattices",
      description:
        "At the 2D limit, hexagonal systems such as monolayer transition metal dichalcogenides (TMDs) and graphene exhibit unique coupled spin and momentum-valley physics (valley pseudospin) owing to broken spatial inversion symmetry and strong spin-orbit coupling. Circularly polarized light provides the means for pseudospin-selective excitation of excitons (or electrons and holes) and can yield momentum-valley polarized populations of carriers that are the subject of proposed valleytronic applications. The chirality of these excited carriers have important consequences for the available relaxation/scattering pathways, which must conserve (pseudo)angular momentum as well as energy. One available relaxation channel that satisfies these constraints is coupling to chiral phonons. Here, we show that chiral carrier-phonon coupling following valley-polarized photoexcitation is expected to lead to a strongly valley-polarized chiral phonon distribution when this relaxation mechanism is dominant. This momentum valley phonon polarization is directly measurable using ultrafast phonon diffuse scattering techniques.",
      tags: [
        {
          name: "chiral phonons",
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
      image: prb,
      source_code_link: "https://journals.aps.org/prb/abstract/10.1103/PhysRevB.107.214306",
    },
    {
      name: "Ultrafast phonon dynamics in atomically thin MoS2",
      description:
        "Transition metal dichalcogenide monolayers and heterostructures are highly tunable material systems that provide excellent models for physical phenomena at the two-dimensional (2D) limit. While most studies to date have focused on electrons and electron-hole pairs, phonons also play essential roles. Here, we apply ultrafast electron diffraction and diffuse scattering to directly quantify, with time and momentum resolution, electron-phonon coupling (EPC) in monolayer molybdenum disulfide and phonon transport from the monolayer to a silicon nitride substrate.",
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

export type argtype = {
    isMobile: boolean
}
export { services, technologies, experiences, projects, social_links };