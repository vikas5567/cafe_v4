// Asset imports — centralised so paths are resolved by Vite
import paneerTikka from '../assets/paneer-tikka.jpg';
import whiteSaucePasta from '../assets/white-sauce-pasta.jpg';
import butterChicken from '../assets/butter-chicken.jpg';
import chickenBiryani from '../assets/chicken-biryani.jpg';
import chickenTandoori from '../assets/chicken-tandoori.jpg';
import vegFriedRice from '../assets/veg-fried-rice.jpg';
import berryMocktail from '../assets/berry-mocktail.jpg';
import chocolateBrownie from '../assets/chocolate-brownie.jpg';
import heroBg from '../assets/hero_bg.png';
import logo from '../assets/Logo.png';

export const DISH_IMAGES: Record<string, string> = {
  'paneer-tikka': paneerTikka,
  'white-sauce-pasta': whiteSaucePasta,
  'butter-chicken': butterChicken,
  'chicken-biryani': chickenBiryani,
  'chicken-tandoori': chickenTandoori,
  'veg-fried-rice': vegFriedRice,
  'berry-mocktail': berryMocktail,
  'chocolate-brownie': chocolateBrownie,
};

export { logo, heroBg };
