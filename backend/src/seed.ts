import { dataSource } from "./config/db";
import { Article } from "./entities/article";
import { Product } from "./entities/product";

const products = [
  {
    name: "Vélo de montagne",
    description:
      "Un vélo robuste et léger, parfait pour les sentiers et les aventures en plein air.",
    imgUrl:
      "https://cdn.shoplightspeed.com/shops/639663/files/48972500/800x1067x3/trek-slash-7-deore-xt-velo-de-montagne-double-susp.jpg",
    price: 350.0,
  },
  {
    name: "Planche de surf",
    description:
      "Planche de surf en époxy, idéale pour les débutants et les surfeurs expérimentés.",
    imgUrl:
      "https://ecosurfshop.eu/2963-superlarge_default/collective-planche-de-surf-durable-alma-resine-teintee.jpg",
    price: 250.0,
  },
  {
    name: "Skis de randonnée",
    description:
      "Skis légers avec fixations ajustables, parfaits pour l'hiver.",
    imgUrl:
      "https://www.labourseauxskis.com/40249-large_default/pack-ski-rando.jpg",
    price: 400.0,
  },
  {
    name: "Raquette de tennis",
    description: "Raquette légère, parfaite pour les joueurs de tous niveaux.",
    imgUrl:
      "https://contents.mediadecathlon.com/p695308/k$2d878227fb0b1103e8a78c33393691cd/sq/236d1957-93e7-4411-83b2-64d092979964.jpg?format=auto&f=800x0",
    price: 70.0,
  },
  {
    name: "Équipement de plongée",
    description: "Kit de plongée comprenant un masque, un tuba et des palmes.",
    imgUrl:
      "https://res.cloudinary.com/manawa/image/upload/f_auto,c_limit,w_1920,q_auto/articles/complete-guide-to-scuba-diving/scuba_diving_equipment_bookyourdive_com_twdojp",
    price: 100.0,
  },
  {
    name: "Paddleboard gonflable",
    description: "Paddleboard facile à transporter, parfait pour les lacs.",
    imgUrl:
      "https://m.media-amazon.com/images/I/811qoszTe4L._AC_UF1000,1000_QL80_.jpg",
    price: 300.0,
  },
  {
    name: "Canoë",
    description:
      "Canoë léger, idéal pour les sorties en famille ou entre amis.",
    imgUrl:
      "https://www.fr.galaxykayaks.eu/10222-thickbox_default/Canoe-2-3.jpg",
    price: 450.0,
  },
  {
    name: "Vélo de route",
    description: "Vélo de route performant pour les cyclistes sur asphalte.",
    imgUrl:
      "https://www.shutterstock.com/image-vector/racing-f-bicycle-vector-perfect-600nw-2404272243.jpg",
    price: 600.0,
  },
  {
    name: "Équipement de ski",
    description:
      "Équipement complet de ski, comprenant des skis et des chaussures.",
    imgUrl: "https://barlessports.fr/112/pack-ski-minime.jpg",
    price: 700.0,
  },
  {
    name: "Tapis de yoga",
    description:
      "Tapis de yoga antidérapant pour un confort optimal pendant vos séances.",
    imgUrl:
      "https://cdn.chin-mudra.yoga/uploads/products/tapis-de-yoga-confort-non-toxiques-183cm-x-61cm-x-6mm-mauve-orchidee-1535912246.jpg",
    price: 30.0,
  },
  {
    name: "Raquettes à neige",
    description: "Raquettes à neige légères pour les randonnées hivernales.",
    imgUrl:
      "https://res.cloudinary.com/randozone/image/upload/q_auto:good/v1577643182/articles/raquettes/raquettes-neige-chaussures-7081",
    price: 90.0,
  },
  {
    name: "Équipement de fitness",
    description: "Kit de fitness complet pour s'entraîner à la maison.",
    imgUrl:
      "https://img.freepik.com/vecteurs-libre/ensemble-outils-equipement-fitness-gym-pour-entrainement-sportif_24797-2032.jpg",
    price: 150.0,
  },
  {
    name: "Kitesurf",
    description:
      "Équipement de kitesurf complet, idéal pour les amateurs de sensations fortes.",
    imgUrl:
      "https://kitesurfhyeres.com/wp-content/uploads/2021/03/Cours-de-Kite-Foil-Hyeres.jpg",
    price: 800.0,
  },
  {
    name: "Vélo électrique",
    description: "Vélo électrique pour des balades relaxantes en ville.",
    imgUrl:
      "https://files.swap-europe.com/photos/X-RANGER-loisir-velo-electrique20-02-23.jpg",
    price: 1200.0,
  },
  {
    name: "Cordes à sauter",
    description: "Cordes à sauter de qualité pour un entraînement efficace.",
    imgUrl:
      "https://as-equipement.fr/storage/2024/07/r_540502-Corde-a-sauter-fitness.png",
    price: 20.0,
  },
  {
    name: "Bateau à moteur",
    description:
      "Bateau à moteur pour des sorties sur le lac, inclut les gilets de sauvetage.",
    imgUrl:
      "https://prdm2static.cap-adrenaline.com/media/catalog/product/cache/ffc0f3f61351c9e09b9d78c87ef39df2/r/7/r7c671e_c45a555146a84823a455587b988e5398_mv2.jpg",
    price: 15000.0,
  },
  {
    name: "Équipement de camping",
    description:
      "Ensemble complet d'équipement de camping, idéal pour les aventures en plein air.",
    imgUrl:
      "https://pim.decapro.com/MEDIA/MEDIA/MEDIUM/e17/e179c397-2bbe-427f-9886-24514a928068.jpg",
    price: 200.0,
  },
  {
    name: "Ski nautique",
    description:
      "Équipement de ski nautique pour les amateurs de sensations fortes.",
    imgUrl:
      "https://media.freeride-attitude.com/148535-home_default/jobe-allegre-combo-paire-de-skis-nautiquesjobe.jpg",
    price: 600.0,
  },
  {
    name: "Trottinette",
    description: "Trottinette pliable pour se déplacer facilement en ville.",
    imgUrl: "https://media.materiel.net/r900/products/MN0006055331.jpg",
    price: 100.0,
  },
];

const seedDatabase = async () => {
  await dataSource.initialize();
  const savedProducts = await dataSource.getRepository(Product).save(products);

  const articles = [
    { availability: true, product: savedProducts[0] },
    { availability: false, product: savedProducts[0] },
    { availability: true, product: savedProducts[1] },
    { availability: true, product: savedProducts[2] },
    { availability: false, product: savedProducts[2] },
    { availability: true, product: savedProducts[3] },
    { availability: true, product: savedProducts[4] },
    { availability: true, product: savedProducts[5] },
    { availability: true, product: savedProducts[6] },
    { availability: true, product: savedProducts[7] },
    { availability: false, product: savedProducts[8] },
    { availability: true, product: savedProducts[9] },
    { availability: true, product: savedProducts[10] },
    { availability: true, product: savedProducts[11] },
    { availability: true, product: savedProducts[12] },
    { availability: true, product: savedProducts[13] },
    { availability: true, product: savedProducts[14] },
    { availability: true, product: savedProducts[15] },
    { availability: true, product: savedProducts[16] },
    { availability: false, product: savedProducts[17] },
    { availability: true, product: savedProducts[18] },
  ];

  await dataSource.getRepository(Article).save(articles);

  console.log("Données insérées avec succès !");
  await dataSource.destroy();
};

seedDatabase().catch(console.error);
