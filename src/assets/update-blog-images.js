// Script to update blog posts with unique images
// Run this after creating the 25 unique images

const fs = require('fs');
const path = require('path');

// New image imports to add
const newImageImports = `
import koreaDigitalPower from './korea-digital-power.jpg';
import capitalismConstitutionalValues from './capitalism-constitutional-values.jpg';
import trademarkRightsFairPlay from './trademark-rights-fair-play.jpg';
import trademarksGlobalCommerce from './trademarks-global-commerce.jpg';
import trademarksUkEuBattles from './trademarks-uk-eu-battles.jpg';
import homeownersInsuranceClimate from './homeowners-insurance-climate.jpg';
import australiaAmlRegime from './australia-aml-regime.jpg';
import newEraCapitalism from './new-era-capitalism.jpg';
import globalProfitsTaxSystem from './global-profits-tax-system.jpg';
import britainCryptoInnovation from './britain-crypto-innovation.jpg';
import corporateTaxationMaze from './corporate-taxation-maze.jpg';
import southAsianFuture from './south-asian-future.jpg';
import redditWallStreetRegulation from './reddit-wall-street-regulation.jpg';
import europeCapitalClimate from './europe-capital-climate.jpg';
import euGlobalFinanceGrip from './eu-global-finance-grip.jpg';
import openBankingEvolution from './open-banking-evolution.jpg';
import londonHongKongBlockchain from './london-hong-kong-blockchain.jpg';
import britainFraudVictims from './britain-fraud-victims.jpg';
import dataCurrencyFinanceRules from './data-currency-finance-rules.jpg';
import germanyEnergyGridWar from './germany-energy-grid-war.jpg';
import jurisdictionalJigsawInvestment from './jurisdictional-jigsaw-investment.jpg';
import cisgAustralianCourts from './cisg-australian-courts.jpg';
import powerSovereigntyBorders from './power-sovereignty-borders.jpg';
import climateRulesEnergyCompensation from './climate-rules-energy-compensation.jpg';
import microsoftActivisionScrutiny from './microsoft-activision-scrutiny.jpg';
`;

// Blog post image mapping
const blogImageMapping = {
  'battle-digital-power-korea-laws-shifting': 'koreaDigitalPower',
  'can-capitalism-be-fair-legal-look-competition-constitutional-values': 'capitalismConstitutionalValues',
  'trademark-rights-fair-play-first-use-protection': 'trademarkRightsFairPlay',
  'how-trademarks-became-currency-global-commerce': 'trademarksGlobalCommerce',
  'when-trademarks-collide-legal-tangle-uk-eu-brand-battles': 'trademarksUkEuBattles',
  'homeowners-insurance-crisis-climate-change-collapsing-system': 'homeownersInsuranceClimate',
  'australia-expands-aml-regime-following-british-example': 'australiaAmlRegime',
  'new-era-capitalism-reformers-rewrite-corporate-purpose': 'newEraCapitalism',
  'global-profits-rise-demands-fairer-tax-system': 'globalProfitsTaxSystem',
  'britains-gamble-crypto-innovation-control': 'britainCryptoInnovation',
  'navigating-maze-corporate-taxation-governance-global-economy': 'corporateTaxationMaze',
  'capital-confidence-south-asian-future': 'southAsianFuture',
  'reddit-took-wall-street-rethinking-market-regulation-social-media-age': 'redditWallStreetRegulation',
  'europe-capital-market-makeover-financial-plumbing-climate-mission': 'europeCapitalClimate',
  'eu-tightening-grip-global-finance-problem': 'euGlobalFinanceGrip',
  'open-banking-evolving-fast-need-know-now': 'openBankingEvolution',
  'london-holds-line-hong-kong-bets-blockchain': 'londonHongKongBlockchain',
  'britains-fraud-strategy-lacks-direction-victims-unheard': 'britainFraudVictims',
  'data-becomes-currency-uk-eu-rewrite-rules-finance': 'dataCurrencyFinanceRules',
  'war-reshapes-europe-germany-moves-reclaim-energy-grid': 'germanyEnergyGridWar',
  'jurisdictional-jigsaw-clause-shape-future-global-investment-law': 'jurisdictionalJigsawInvestment',
  'thirty-years-cisg-struggles-relevance-australian-courts': 'cisgAustralianCourts',
  'rethinking-power-sovereignty-world-without-borders': 'powerSovereigntyBorders',
  'climate-rules-tighten-energy-companies-battle-compensation': 'climateRulesEnergyCompensation',
  'microsoft-activision-deal-faces-scrutiny-uk-eu-regulators': 'microsoftActivisionScrutiny'
};

// Function to update the legal insights posts file
function updateLegalInsightsPosts() {
  const filePath = path.join(__dirname, '../data/legal-insights/legalInsightsPosts.ts');
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Add new image imports
  const importSection = content.indexOf('import internationalLaw');
  const insertPosition = content.indexOf('export const legalInsightsPosts');
  
  content = content.slice(0, insertPosition) + newImageImports + '\n' + content.slice(insertPosition);
  
  // Update each blog post's imageUrl
  Object.entries(blogImageMapping).forEach(([postId, imageName]) => {
    const regex = new RegExp(`id: '${postId}'.*?imageUrl: [^,]+`, 's');
    const replacement = `id: '${postId}'$&imageUrl: ${imageName}`;
    content = content.replace(regex, replacement);
  });
  
  fs.writeFileSync(filePath, content);
  console.log('✅ Updated legal insights posts with unique images');
}

// Function to create placeholder image files
function createPlaceholderImages() {
  const imageNames = [
    'korea-digital-power.jpg',
    'capitalism-constitutional-values.jpg',
    'trademark-rights-fair-play.jpg',
    'trademarks-global-commerce.jpg',
    'trademarks-uk-eu-battles.jpg',
    'homeowners-insurance-climate.jpg',
    'australia-aml-regime.jpg',
    'new-era-capitalism.jpg',
    'global-profits-tax-system.jpg',
    'britain-crypto-innovation.jpg',
    'corporate-taxation-maze.jpg',
    'south-asian-future.jpg',
    'reddit-wall-street-regulation.jpg',
    'europe-capital-climate.jpg',
    'eu-global-finance-grip.jpg',
    'open-banking-evolution.jpg',
    'london-hong-kong-blockchain.jpg',
    'britain-fraud-victims.jpg',
    'data-currency-finance-rules.jpg',
    'germany-energy-grid-war.jpg',
    'jurisdictional-jigsaw-investment.jpg',
    'cisg-australian-courts.jpg',
    'power-sovereignty-borders.jpg',
    'climate-rules-energy-compensation.jpg',
    'microsoft-activision-scrutiny.jpg'
  ];
  
  imageNames.forEach(imageName => {
    const imagePath = path.join(__dirname, imageName);
    if (!fs.existsSync(imagePath)) {
      // Create a simple placeholder file
      fs.writeFileSync(imagePath, 'PLACEHOLDER_IMAGE');
      console.log(`📁 Created placeholder for: ${imageName}`);
    }
  });
}

// Run the updates
console.log('🚀 Starting blog image updates...');
createPlaceholderImages();
updateLegalInsightsPosts();
console.log('✅ All updates completed!');
console.log('\n📝 Next steps:');
console.log('1. Replace placeholder images with actual generated images');
console.log('2. Run the script again to update the blog posts');
console.log('3. Test the blog to ensure all images display correctly'); 