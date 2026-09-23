"use client";

import { useState, useEffect, useRef } from "react";

const NIGERIAN_LGAS: Record<string, string[]> = {
  "All Nigeria": ["All LGAs"],

  Abia: [
    "Aba North",
    "Aba South",
    "Arochukwu",
    "Bende",
    "Ikwuano",
    "Isiala Ngwa North",
    "Isiala Ngwa South",
    "Isuikwuato",
    "Obi Ngwa",
    "Ohafia",
    "Osisioma Ngwa",
    "Ugwunagbo",
    "Ukwa East",
    "Ukwa West",
    "Umuahia North",
    "Umuahia South",
    "Umunneochi",
  ],

  Adamawa: [
    "Demsa",
    "Fufore",
    "Ganye",
    "Gayuk",
    "Gombi",
    "Grie",
    "Hong",
    "Jada",
    "Jimeta",
    "Lamurde",
    "Madagali",
    "Maiha",
    "Mayo-Belwa",
    "Michika",
    "Mubi North",
    "Mubi South",
    "Numan",
    "Shelleng",
    "Song",
    "Toungo",
    "Yola North",
    "Yola South",
  ],

  "Akwa Ibom": [
    "Abak",
    "Eastern Obolo",
    "Eket",
    "Esit Eket",
    "Essien Udim",
    "Etim Ekpo",
    "Etinan",
    "Ibeno",
    "Ibesikpo Asutan",
    "Ibiono-Ibom",
    "Ika",
    "Ikono",
    "Ikot Abasi",
    "Ikot Ekpene",
    "Ini",
    "Itu",
    "Mbo",
    "Mkpat-Enin",
    "Nsit-Atai",
    "Nsit-Ibom",
    "Nsit-Ubium",
    "Obot Akara",
    "Okobo",
    "Onna",
    "Oron",
    "Oruk Anam",
    "Udung-Uko",
    "Ukanafun",
    "Uruan",
    "Urue-Offong/Oruko",
    "Uyo",
  ],

  Anambra: [
    "Aguata",
    "Anambra East",
    "Anambra West",
    "Anaocha",
    "Awka North",
    "Awka South",
    "Ayamelum",
    "Dunukofia",
    "Ekwusigo",
    "Idemili North",
    "Idemili South",
    "Ihiala",
    "Njikoka",
    "Nnewi North",
    "Nnewi South",
    "Ogbaru",
    "Onitsha North",
    "Onitsha South",
    "Orumba North",
    "Orumba South",
    "Oyi",
  ],

  Bauchi: [
    "Bauchi",
    "Bogoro",
    "Damban",
    "Darazo",
    "Dass",
    "Gamawa",
    "Ganjuwa",
    "Giade",
    "Itas/Gadau",
    "Jama'are",
    "Katagum",
    "Kirfi",
    "Misau",
    "Ningi",
    "Shira",
    "Tafawa Balewa",
    "Toro",
    "Warji",
    "Zaki",
  ],

  Bayelsa: [
    "Brass",
    "Ekeremor",
    "Kolokuma/Opokuma",
    "Nembe",
    "Ogbia",
    "Sagbama",
    "Southern Ijaw",
    "Yenagoa",
  ],

  Benue: [
    "Ado",
    "Agatu",
    "Apa",
    "Buruku",
    "Gboko",
    "Guma",
    "Gwer East",
    "Gwer West",
    "Katsina-Ala",
    "Konshisha",
    "Kwande",
    "Logo",
    "Makurdi",
    "Obi",
    "Ogbadibo",
    "Ohimini",
    "Oju",
    "Okpokwu",
    "Oturkpo",
    "Tarka",
    "Ukum",
    "Ushongo",
    "Vandeikya",
  ],

  Borno: [
    "Abadam",
    "Askira/Uba",
    "Bama",
    "Bayo",
    "Biu",
    "Chibok",
    "Damboa",
    "Dikwa",
    "Gubio",
    "Guzamala",
    "Gwoza",
    "Hawul",
    "Jere",
    "Kaga",
    "Kala/Balge",
    "Konduga",
    "Kukawa",
    "Kwaya Kusar",
    "Mafa",
    "Magumeri",
    "Maiduguri",
    "Marte",
    "Mobbar",
    "Monguno",
    "Ngala",
    "Nganzai",
    "Shani",
  ],

  "Cross River": [
    "Abi",
    "Akamkpa",
    "Akpabuyo",
    "Bakassi",
    "Bekwarra",
    "Biase",
    "Boki",
    "Calabar Municipal",
    "Calabar South",
    "Etung",
    "Ikom",
    "Obanliku",
    "Obubra",
    "Obudu",
    "Odukpani",
    "Ogoja",
    "Yakuur",
    "Yala",
  ],

  Delta: [
    "Aniocha North",
    "Aniocha South",
    "Bomadi",
    "Burutu",
    "Ethiope East",
    "Ethiope West",
    "Ika North East",
    "Ika South",
    "Isoko North",
    "Isoko South",
    "Ndokwa East",
    "Ndokwa West",
    "Okpe",
    "Oshimili North",
    "Oshimili South",
    "Patani",
    "Sapele",
    "Udu",
    "Ughelli North",
    "Ughelli South",
    "Ukwuani",
    "Uvwie",
    "Warri North",
    "Warri South",
    "Warri South West",
  ],

  Ebonyi: [
    "Abakaliki",
    "Afikpo North",
    "Afikpo South",
    "Ebonyi",
    "Ezza North",
    "Ezza South",
    "Ikwo",
    "Ishielu",
    "Ivo",
    "Izzi",
    "Ohaukwu",
    "Ohaozara",
    "Onicha",
  ],

  Edo: [
    "Akoko-Edo",
    "Egor",
    "Esan Central",
    "Esan North-East",
    "Esan South-East",
    "Esan West",
    "Etsako Central",
    "Etsako East",
    "Etsako West",
    "Igueben",
    "Ikpoba-Okha",
    "Oredo",
    "Orhionmwon",
    "Ovia North-East",
    "Ovia South-West",
    "Owan East",
    "Owan West",
    "Uhunmwonde",
  ],

  Ekiti: [
    "Ado Ekiti",
    "Efon",
    "Ekiti East",
    "Ekiti South-West",
    "Ekiti West",
    "Emure",
    "Gbonyin",
    "Ido-Osi",
    "Ijero",
    "Ikere",
    "Ikole",
    "Ilejemeje",
    "Irepodun/Ifelodun",
    "Ise/Orun",
    "Moba",
    "Oye",
  ],

  Enugu: [
    "Aninri",
    "Awgu",
    "Enugu East",
    "Enugu North",
    "Enugu South",
    "Ezeagu",
    "Igbo-Etiti",
    "Igbo-Eze North",
    "Igbo-Eze South",
    "Isi-Uzo",
    "Nkanu East",
    "Nkanu West",
    "Nsukka",
    "Oji River",
    "Udenu",
    "Udi",
    "Uzo-Uwani",
  ],

  "FCT (Abuja)": [
    "Abaji",
    "Bwari",
    "Gwagwalada",
    "Kuje",
    "Kwali",
    "Municipal Area Council",
  ],

  Gombe: [
    "Akko",
    "Balanga",
    "Billiri",
    "Dukku",
    "Funakaye",
    "Gombe",
    "Kaltungo",
    "Kwami",
    "Nafada",
    "Shongom",
    "Yamaltu/Deba",
  ],

  Imo: [
    "Aboh Mbaise",
    "Ahiazu Mbaise",
    "Ehime Mbano",
    "Ezinihitte",
    "Ideato North",
    "Ideato South",
    "Ihitte/Uboma",
    "Ikeduru",
    "Isiala Mbano",
    "Isu",
    "Mbaitoli",
    "Ngor Okpala",
    "Njaba",
    "Nkwerre",
    "Nwangele",
    "Obowo",
    "Oguta",
    "Ohaji/Egbema",
    "Okigwe",
    "Orlu",
    "Orsu",
    "Oru East",
    "Oru West",
    "Owerri Municipal",
    "Owerri North",
    "Owerri West",
    "Unuimo",
  ],

  Jigawa: [
    "Auyo",
    "Babura",
    "Biriniwa",
    "Birnin Kudu",
    "Buji",
    "Dutse",
    "Gagarawa",
    "Garki",
    "Gumel",
    "Guri",
    "Gwaram",
    "Gwiwa",
    "Hadejia",
    "Jahun",
    "Kafin Hausa",
    "Kaugama",
    "Kazaure",
    "Kiri Kasama",
    "Kiyawa",
    "Maigatari",
    "Malam Madori",
    "Miga",
    "Ringim",
    "Roni",
    "Sule Tankarkar",
    "Taura",
    "Yankwashi",
  ],

  Kaduna: [
    "Birnin Gwari",
    "Chikun",
    "Giwa",
    "Igabi",
    "Ikara",
    "Jaba",
    "Jema'a",
    "Kachia",
    "Kaduna North",
    "Kaduna South",
    "Kagarko",
    "Kajuru",
    "Kaura",
    "Kauru",
    "Kubau",
    "Kudan",
    "Lere",
    "Makarfi",
    "Sabon Gari",
    "Sanga",
    "Soba",
    "Zangon Kataf",
    "Zaria",
  ],

  Kano: [
    "Ajingi",
    "Albasu",
    "Bagwai",
    "Bebeji",
    "Bichi",
    "Bunkure",
    "Dala",
    "Dambatta",
    "Dawakin Kudu",
    "Dawakin Tofa",
    "Doguwa",
    "Fagge",
    "Gabasawa",
    "Garko",
    "Garun Mallam",
    "Gaya",
    "Gezawa",
    "Gwale",
    "Gwarzo",
    "Kabo",
    "Kano Municipal",
    "Karaye",
    "Kibiya",
    "Kiru",
    "Kumbotso",
    "Kunchi",
    "Kura",
    "Madobi",
    "Makoda",
    "Minjibir",
    "Nasarawa",
    "Rano",
    "Rimin Gado",
    "Rogo",
    "Shanono",
    "Sumaila",
    "Takai",
    "Tarauni",
    "Tofa",
    "Tsanyawa",
    "Tudun Wada",
    "Ungogo",
    "Warawa",
    "Wudil",
  ],

  Katsina: [
    "Bakori",
    "Batagarawa",
    "Batsari",
    "Baure",
    "Bindawa",
    "Charanchi",
    "Dan Musa",
    "Dandume",
    "Danja",
    "Daura",
    "Dutsi",
    "Dutsin-Ma",
    "Faskari",
    "Funtua",
    "Ingawa",
    "Jibia",
    "Kafur",
    "Kaita",
    "Kankara",
    "Kankia",
    "Katsina",
    "Kurfi",
    "Kusada",
    "Mai'Adua",
    "Malumfashi",
    "Mani",
    "Mashi",
    "Matazu",
    "Musawa",
    "Rimi",
    "Sabuwa",
    "Safana",
    "Sandamu",
    "Zango",
  ],

  Kebbi: [
    "Aleiro",
    "Arewa Dandi",
    "Argungu",
    "Augie",
    "Bagudo",
    "Birnin Kebbi",
    "Bunza",
    "Dandi",
    "Fakai",
    "Gwandu",
    "Jega",
    "Kalgo",
    "Koko/Besse",
    "Maiyama",
    "Ngaski",
    "Sakaba",
    "Shanga",
    "Suru",
    "Wasagu/Danko",
    "Yauri",
    "Zuru",
  ],

  Kogi: [
    "Adavi",
    "Ajaokuta",
    "Ankpa",
    "Bassa",
    "Dekina",
    "Ibaji",
    "Idah",
    "Igalamela-Odolu",
    "Ijumu",
    "Kabba/Bunu",
    "Kogi",
    "Lokoja",
    "Mopa-Muro",
    "Ofu",
    "Ogori/Magongo",
    "Okehi",
    "Okene",
    "Olamaboro",
    "Omala",
    "Yagba East",
    "Yagba West",
  ],

  Kwara: [
    "Asa",
    "Baruten",
    "Edu",
    "Ekiti",
    "Ifelodun",
    "Ilorin East",
    "Ilorin South",
    "Ilorin West",
    "Irepodun",
    "Isin",
    "Kaiama",
    "Moro",
    "Offa",
    "Oke Ero",
    "Oyun",
    "Pategi",
  ],

  Lagos: [
    "Agege",
    "Ajeromi-Ifelodun",
    "Alimosho",
    "Amuwo-Odofin",
    "Apapa",
    "Badagry",
    "Epe",
    "Eti-Osa",
    "Ibeju-Lekki",
    "Ifako-Ijaiye",
    "Ikeja",
    "Ikorodu",
    "Kosofe",
    "Lagos Island",
    "Lagos Mainland",
    "Mushin",
    "Ojo",
    "Oshodi-Isolo",
    "Shomolu",
    "Surulere",
  ],

  Nasarawa: [
    "Akwanga",
    "Awe",
    "Doma",
    "Karu",
    "Keana",
    "Keffi",
    "Kokona",
    "Lafia",
    "Nasarawa",
    "Nasarawa Eggon",
    "Obi",
    "Toto",
    "Wamba",
  ],

  Niger: [
    "Agaie",
    "Agwara",
    "Bida",
    "Borgu",
    "Bosso",
    "Chanchaga",
    "Edati",
    "Gbako",
    "Gurara",
    "Katcha",
    "Kontagora",
    "Lapai",
    "Lavun",
    "Magama",
    "Mariga",
    "Mashegu",
    "Mokwa",
    "Munya",
    "Paikoro",
    "Rafi",
    "Rijau",
    "Shiroro",
    "Suleja",
    "Tafa",
    "Wushishi",
  ],

  Ogun: [
    "Abeokuta North",
    "Abeokuta South",
    "Ado-Odo/Ota",
    "Egbado North",
    "Egbado South",
    "Ewekoro",
    "Ifo",
    "Ijebu East",
    "Ijebu North",
    "Ijebu North East",
    "Ijebu Ode",
    "Ikenne",
    "Imeko Afon",
    "Ipokia",
    "Obafemi Owode",
    "Odeda",
    "Odogbolu",
    "Ogun Waterside",
    "Remo North",
    "Sagamu",
  ],

  Ondo: [
    "Akoko North-East",
    "Akoko North-West",
    "Akoko South-East",
    "Akoko South-West",
    "Akure North",
    "Akure South",
    "Ese Odo",
    "Idanre",
    "Ifedore",
    "Ilaje",
    "Ile Oluji/Okeigbo",
    "Irele",
    "Odigbo",
    "Okitipupa",
    "Ondo East",
    "Ondo West",
    "Ose",
    "Owo",
  ],

  Osun: [
    "Atakunmosa East",
    "Atakunmosa West",
    "Ayedaade",
    "Ayedire",
    "Boluwaduro",
    "Boripe",
    "Ede North",
    "Ede South",
    "Egbedore",
    "Ejigbo",
    "Ife Central",
    "Ife East",
    "Ife North",
    "Ife South",
    "Ifedayo",
    "Ila",
    "Ilesa East",
    "Ilesa West",
    "Irepodun",
    "Irewole",
    "Isokan",
    "Iwo",
    "Obokun",
    "Odo Otin",
    "Ola Oluwa",
    "Olorunda",
    "Oriade",
    "Orolu",
    "Osogbo",
  ],

  Oyo: [
    "Afijio",
    "Akinyele",
    "Atiba",
    "Atisbo",
    "Egbeda",
    "Ibadan North",
    "Ibadan North-East",
    "Ibadan North-West",
    "Ibadan South-East",
    "Ibadan South-West",
    "Ibarapa Central",
    "Ibarapa East",
    "Ibarapa North",
    "Ido",
    "Irepo",
    "Iseyin",
    "Itesiwaju",
    "Iwajowa",
    "Kajola",
    "Lagelu",
    "Ogbomoso North",
    "Ogbomoso South",
    "Ogo Oluwa",
    "Olorunsogo",
    "Oluyole",
    "Ona Ara",
    "Orelope",
    "Ori Ire",
    "Oyo East",
    "Oyo West",
    "Saki East",
    "Saki West",
    "Surulere",
  ],

  Plateau: [
    "Barkin Ladi",
    "Bassa",
    "Bokkos",
    "Jos East",
    "Jos North",
    "Jos South",
    "Kanam",
    "Kanke",
    "Langtang North",
    "Langtang South",
    "Mangu",
    "Mikang",
    "Pankshin",
    "Qua'an Pan",
    "Riyom",
    "Shendam",
    "Wase",
  ],

  Rivers: [
    "Abua/Odual",
    "Ahoada East",
    "Ahoada West",
    "Akuku-Toru",
    "Andoni",
    "Asari-Toru",
    "Bonny",
    "Degema",
    "Eleme",
    "Emohua",
    "Etche",
    "Gokana",
    "Ikwerre",
    "Khana",
    "Obio/Akpor",
    "Ogba/Egbema/Ndoni",
    "Ogu/Bolo",
    "Okrika",
    "Omuma",
    "Opobo/Nkoro",
    "Oyigbo",
    "Port Harcourt",
    "Tai",
  ],

  Sokoto: [
    "Binji",
    "Bodinga",
    "Dange Shuni",
    "Gada",
    "Goronyo",
    "Gudu",
    "Gwadabawa",
    "Illela",
    "Isa",
    "Kebbe",
    "Kware",
    "Rabah",
    "Sabon Birni",
    "Shagari",
    "Silame",
    "Sokoto North",
    "Sokoto South",
    "Tambuwal",
    "Tangaza",
    "Tureta",
    "Wamakko",
    "Wurno",
    "Yabo",
  ],

  Taraba: [
    "Ardo Kola",
    "Bali",
    "Donga",
    "Gashaka",
    "Gassol",
    "Ibi",
    "Jalingo",
    "Karim Lamido",
    "Kumi",
    "Lau",
    "Sardauna",
    "Takum",
    "Ussa",
    "Wukari",
    "Yorro",
    "Zing",
  ],

  Yobe: [
    "Bade",
    "Bursari",
    "Damaturu",
    "Fika",
    "Fune",
    "Geidam",
    "Gujba",
    "Gulani",
    "Jakusko",
    "Karasuwa",
    "Machina",
    "Nangere",
    "Nguru",
    "Potiskum",
    "Tarmuwa",
    "Yunusari",
    "Yusufari",
  ],

  Zamfara: [
    "Anka",
    "Bakura",
    "Birnin Magaji/Kiyaw",
    "Bukun Yum",
    "Bungudu",
    "Chafe",
    "Gummi",
    "Gusau",
    "Isa",
    "Kaura Namoda",
    "Maradun",
    "Maru",
    "Shinkafi",
    "Talata Mafara",
    "Tsafe",
    "Zurmi",
  ],
};

const POPULAR_SEARCHES = [
  { term: "iPhone 15 Pro Max", icon: "📱" },
  { term: "Toyota Corolla 2015", icon: "🚗" },
  { term: "Laptops Core i7", icon: "💻" },
  { term: "Apartments for Rent", icon: "🏢" },
  { term: "Mercedes Benz C300", icon: "🚗" },
  { term: "PlayStation 5 Console", icon: "🎮" },
  { term: "Designer Shoes & Bags", icon: "👜" },
  { term: "Generators & Power", icon: "⚡" },
];

interface SearchBarProps {
  defaultQuery?: string;
  defaultLocation?: string;
  stateAdCounts?: Record<string, number>;
}

export function SearchBar({
  defaultQuery = "",
  defaultLocation = "All Nigeria",
  stateAdCounts = {},
}: SearchBarProps) {
  const [currentLocation, setCurrentLocation] = useState(defaultLocation);

  const [searchQuery, setSearchQuery] = useState(defaultQuery);

  const [isQueryOpen, setIsQueryOpen] = useState(false);

  const [isLocationOpen, setIsLocationOpen] = useState(false);

  const [currentLga, setCurrentLga] = useState("All LGAs");

  const [isLgaOpen, setIsLgaOpen] = useState(false);

  const formWrapperRef = useRef<HTMLFormElement>(null);

  /*
   * Get LGAs for currently selected state.
   * If "All Nigeria" is selected, only show "All LGAs".
   */
  const availableLgas = NIGERIAN_LGAS[currentLocation] || ["All LGAs"];

  /*
   * Close all dropdowns when user clicks outside
   * the search form.
   */
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        formWrapperRef.current &&
        !formWrapperRef.current.contains(event.target as Node)
      ) {
        setIsQueryOpen(false);
        setIsLocationOpen(false);
        setIsLgaOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /*
   * When the state changes, reset the LGA.
   */
  useEffect(() => {
    setCurrentLga("All LGAs");
    setIsLgaOpen(false);
  }, [currentLocation]);

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .pill-search-form-global {
              background-color: #ffffff !important;
              border-radius: 36px !important;
              padding: 0.6rem 0.8rem 0.6rem 1.8rem;
              box-shadow: 0 12px 35px rgba(0, 0, 0, 0.06);
              border: 1px solid rgba(0,0,0,0.04);
              display: flex !important;
              align-items: center;
              justify-content: space-between;
              max-width: 900px !important;
              width: 100% !important;
              margin: 0 auto !important;
              position: relative;
            }

            .pill-search-form-global:focus-within {
              box-shadow:
                0 14px 40px rgba(16, 185, 129, 0.12);
            }

            .search-column-left {
              flex: 1 1 42%;
              min-width: 0;
              height: 100%;
              padding: 4px 0;
              position: static;
            }

            .search-column-right {
              flex: 1 1 58%;
              min-width: 0;
              display: flex;
              align-items: center;
              justify-content: space-between;
              height: 100%;
              position: static;
            }

            .search-input-field {
              font-size: 0.95rem !important;
              font-weight: 500;
              color: #374151;
              width: 100%;
            }

            .search-input-field::placeholder {
              color: #9ca3af;
            }

            .location-dropdown-click-area {
              border-left: 1px solid #e5e7eb;
              padding-left: 20px;
              flex-grow: 1;
              min-width: 0;
            }

            .custom-select-trigger {
              font-size: 0.95rem !important;
              font-weight: 600;
              color: #4b5563;
              background: transparent;
              border: none;
              padding: 6px 28px 6px 0;
              cursor: pointer;
              width: 100%;
              text-align: left;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              position: relative;
            }

            .custom-select-trigger:disabled {
              color: #9ca3af;
              cursor: not-allowed;
            }

            .custom-select-trigger::after {
              content: '▾';
              position: absolute;
              right: 12px;
              top: 50%;
              transform: translateY(-50%);
              font-size: 0.8rem;
              color: #9ca3af;
              pointer-events: none;
            }

            .master-dropdown-panel {
              position: absolute;
              z-index: 2000;
              background-color: #ffffff !important;
              border-radius: 20px;
              border: 1px solid rgba(0,0,0,0.06);
              box-shadow:
                0 20px 45px rgba(0,0,0,0.12) !important;
              padding: 1.5rem;
              list-style: none;
              width: 100% !important;
              left: 0 !important;
              right: 0 !important;
              top: calc(100% + 8px) !important;
              bottom: auto !important;

              display: none;
              opacity: 0;
              transform: translateY(15px);
              transition:
                opacity 0.25s ease,
                transform 0.25s ease;

              max-height: 420px;
              overflow-y: auto;
            }

            .panel-visible-active {
              display: block !important;
              opacity: 1 !important;
              transform: translateY(0) !important;
            }

            .suggestion-grid {
              display: grid;
              grid-template-columns: repeat(4, 1fr);
              gap: 12px;
            }

            .suggestion-item {
              padding: 0.5rem 0.8rem;
              background: #f8f9fa;
              border-radius: 10px;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: space-between;
              transition: all 0.15s ease;
              min-width: 0;
            }

            .suggestion-item:hover {
              background-color: #f0fdf4;
              transform: translateX(2px);
            }

            .suggestion-term {
              font-size: 0.8rem;
              font-weight: 500;
              color: #4b5563;
              text-align: left;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }

            .suggestion-icon-badge {
              font-size: 1rem;
              flex-shrink: 0;
              margin-left: 6px;
            }

            .states-grid-content {
              display: grid !important;
              grid-template-columns: repeat(4, 1fr);
              gap: 6px;
              padding: 0;
              margin: 0;
              list-style: none;
              width: 100%;
            }

            .location-menu-item {
              padding: 0.4rem 0.6rem;
              font-size: 0.82rem;
              font-weight: 500;
              color: #4b5563;
              cursor: pointer;
              border-radius: 6px;
              transition: all 0.15s ease;
              text-align: left;
              display: flex;
              align-items: center;
              justify-content: space-between;
              gap: 4px;
            }

            .location-menu-item:hover {
              background-color: #f0fdf4;
              color: #10b981;
            }

            .dropdown-item-ad-counter {
              font-size: 0.68rem;
              color: #94a3b8;
              font-weight: 700;
              background-color: rgba(0,0,0,0.03);
              padding: 1px 6px;
              border-radius: 10px;
              flex-shrink: 0;
            }

            .location-menu-item:hover
            .dropdown-item-ad-counter {
              color: #10b981;
              background-color: rgba(16, 185, 129, 0.1);
            }

            .search-submit-transparent {
              background: transparent;
              color: #10b981;
              font-size: 1.6rem;
              display: flex;
              align-items: center;
              justify-content: center;
              border: none;
              padding: 0 4px 0 15px;
              transition: transform 0.2s ease;
              flex-shrink: 0;
              cursor: pointer;
            }

            .search-submit-transparent:hover {
              transform: scale(1.08);
            }

            .search-submit-transparent:active {
              transform: scale(0.95);
            }

            /* Scrollbar */
            .master-dropdown-panel::-webkit-scrollbar {
              width: 6px;
            }

            .master-dropdown-panel::-webkit-scrollbar-track {
              background: transparent;
            }

            .master-dropdown-panel::-webkit-scrollbar-thumb {
              background: #d1d5db;
              border-radius: 10px;
            }

            @media (max-width: 940px) {
              .pill-search-form-global,
              .master-dropdown-panel {
                max-width: 100% !important;
                width: 100% !important;
              }

              .states-grid-content,
              .suggestion-grid {
                grid-template-columns: repeat(2, 1fr);
              }
            }

            @media (max-width: 768px) {
              .pill-search-form-global {
                padding-left: 1.2rem;
              }

              .search-column-left {
                flex: 1 1 40%;
              }

              .search-column-right {
                flex: 1 1 60%;
              }

              .location-dropdown-click-area {
                padding-left: 12px;
              }

              .custom-select-trigger {
                font-size: 0.85rem !important;
              }
            }

            @media (max-width: 576px) {
              .pill-search-form-global {
                flex-direction: column !important;
                align-items: stretch !important;
                border-radius: 20px !important;
                padding: 1rem;
                gap: 12px;
              }

              .search-column-left,
              .search-column-right {
                width: 100%;
                flex: none;
              }

              .search-column-right {
                gap: 8px;
              }

              .location-dropdown-click-area {
                border-left: none;
                padding-left: 0;
              }

              .search-column-right
              .location-dropdown-click-area {
                border-left: 1px solid #e5e7eb;
                padding-left: 12px;
              }

              .states-grid-content,
              .suggestion-grid {
                grid-template-columns: 1fr;
              }

              .master-dropdown-panel {
                border-radius: 16px;
                padding: 1rem;
              }

              .search-submit-transparent {
                padding-right: 4px;
              }
            }
          `,
        }}
      />

      <form
        action="/search"
        method="get"
        className="pill-search-form-global"
        ref={formWrapperRef}
      >
        {/* Search query */}
        <div className="search-column-left">
          <input type="hidden" name="location" value={currentLocation} />

          <input type="hidden" name="lga" value={currentLga} />

          <input
            name="q"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="I am looking for..."
            className="form-control border-0 bg-transparent shadow-none search-input-field py-1 px-0"
            required
            autoComplete="off"
            onClick={() => {
              setIsQueryOpen(true);
              setIsLocationOpen(false);
              setIsLgaOpen(false);
            }}
          />

          {/* Trending searches */}
          <div
            className={`master-dropdown-panel suggestion-panel ${
              isQueryOpen ? "panel-visible-active" : ""
            }`}
          >
            <h6
              className="text-start mb-2 text-secondary"
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.5px",
              }}
            >
              🔥 TRENDING SEARCHES
            </h6>

            <div className="suggestion-grid">
              {POPULAR_SEARCHES.map((item) => (
                <div
                  key={item.term}
                  className="suggestion-item"
                  onClick={() => {
                    setSearchQuery(item.term);
                    setIsQueryOpen(false);
                  }}
                >
                  <span className="suggestion-term">🔍 {item.term}</span>

                  <span className="suggestion-icon-badge">{item.icon}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Location / LGA / Search */}
        <div className="search-column-right">
          {/* State */}
          <div className="location-dropdown-click-area">
            <button
              type="button"
              className="custom-select-trigger"
              onClick={() => {
                setIsLocationOpen((open) => !open);
                setIsQueryOpen(false);
                setIsLgaOpen(false);
              }}
              aria-expanded={isLocationOpen}
            >
              {currentLocation}
            </button>

            {/* State dropdown */}
            <div
              className={`master-dropdown-panel location-panel ${
                isLocationOpen ? "panel-visible-active" : ""
              }`}
            >
              <ul className="states-grid-content">
                {Object.keys(NIGERIAN_LGAS).map((state) => (
                  <li
                    key={state}
                    className="location-menu-item"
                    onClick={() => {
                      setCurrentLocation(state);
                      setCurrentLga("All LGAs");
                      setIsLocationOpen(false);
                    }}
                  >
                    <span>{state}</span>

                    {stateAdCounts[state] !== undefined && (
                      <span className="dropdown-item-ad-counter">
                        {stateAdCounts[state]}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* LGA */}
          <div
            className="search-column-right border-left ms-2 ps-2 flex-grow-1"
            style={{
              minWidth: 0,
            }}
          >
            <div className="location-dropdown-click-area">
              <button
                type="button"
                className="custom-select-trigger"
                disabled={currentLocation === "All Nigeria"}
                onClick={() => {
                  if (currentLocation === "All Nigeria") {
                    return;
                  }

                  setIsLgaOpen((open) => !open);

                  setIsQueryOpen(false);
                  setIsLocationOpen(false);
                }}
                aria-expanded={isLgaOpen}
              >
                🏢 {currentLga}
              </button>

              {/* Dynamic LGA dropdown */}
              <div
                className={`master-dropdown-panel location-panel ${
                  isLgaOpen ? "panel-visible-active" : ""
                }`}
              >
                <ul className="states-grid-content">
                  {availableLgas.map((lga) => (
                    <li
                      key={lga}
                      className="location-menu-item"
                      onClick={(e) => {
                        e.stopPropagation();

                        setCurrentLga(lga);
                        setIsLgaOpen(false);
                      }}
                    >
                      <span>🏢 {lga}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Search button */}
          <button
            type="submit"
            className="search-submit-transparent"
            aria-label="Search"
          >
            🔍
          </button>
        </div>
      </form>
    </>
  );
}
