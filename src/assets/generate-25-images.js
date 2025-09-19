const fs = require('fs');
const path = require('path');

// Blog post IDs and their corresponding image names
const blogImageMapping = [
  { id: 'battle-digital-power-korea-laws-shifting', image: 'korea-digital-power' },
  { id: 'can-capitalism-be-fair-legal-look-competition-constitutional-values', image: 'capitalism-constitutional-values' },
  { id: 'trademark-rights-fair-play-first-use-protection', image: 'trademark-rights-fair-play' },
  { id: 'how-trademarks-became-currency-global-commerce', image: 'trademarks-global-commerce' },
  { id: 'when-trademarks-collide-legal-tangle-uk-eu-brand-battles', image: 'trademarks-uk-eu-battles' },
  { id: 'homeowners-insurance-crisis-climate-change-collapsing-system', image: 'homeowners-insurance-climate' },
  { id: 'australia-expands-aml-regime-following-british-example', image: 'australia-aml-regime' },
  { id: 'new-era-capitalism-reformers-rewrite-corporate-purpose', image: 'new-era-capitalism' },
  { id: 'global-profits-rise-demands-fairer-tax-system', image: 'global-profits-tax-system' },
  { id: 'britain-gamble-crypto-innovation-control', image: 'britain-crypto-innovation' },
  { id: 'corporate-taxation-governance-maze-global-business', image: 'corporate-taxation-maze' },
  { id: 'capital-confidence-south-asian-future', image: 'capital-confidence-south-asia' },
  { id: 'reddit-wall-street-social-media-regulation', image: 'reddit-wall-street-regulation' },
  { id: 'europe-capital-market-climate-mission', image: 'europe-capital-climate' },
  { id: 'eu-tightening-grip-global-finance-problem', image: 'eu-tightening-finance' },
  { id: 'open-banking-evolving-fast-know-now', image: 'open-banking-evolution' },
  { id: 'london-hong-kong-blockchain-bets', image: 'london-hong-kong-blockchain' },
  { id: 'britain-fraud-strategy-lacks-direction-victims', image: 'britain-fraud-strategy' },
  { id: 'data-currency-uk-eu-finance-rules', image: 'data-currency-uk-eu' },
  { id: 'war-europe-germany-energy-grid', image: 'war-europe-germany-energy' },
  { id: 'jurisdictional-jigsaw-investment-law', image: 'jurisdictional-jigsaw-investment' },
  { id: 'cisg-australian-courts-relevance', image: 'cisg-australian-courts' },
  { id: 'power-sovereignty-world-without-borders', image: 'power-sovereignty-world' },
  { id: 'climate-rules-energy-companies-compensation', image: 'climate-rules-energy' },
  { id: 'microsoft-activision-uk-eu-scrutiny', image: 'microsoft-activision-scrutiny' }
];

// Create placeholder image files
function createPlaceholderImages() {
  console.log('Creating placeholder image files...');
  
  blogImageMapping.forEach(({ image }) => {
    const imagePath = path.join(__dirname, `${image}.jpg`);
    if (!fs.existsSync(imagePath)) {
      // Create a simple placeholder file
      fs.writeFileSync(imagePath, '');
      console.log(`Created placeholder: ${image}.jpg`);
    }
  });
}

// Update the legalInsightsPosts.ts file
function updateBlogPosts() {
  console.log('Updating blog posts with new images...');
  
  const filePath = path.join(__dirname, '../data/legal-insights/legalInsightsPosts.ts');
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Add imports for all 25 new images
  const importStatements = blogImageMapping.map(({ image }) => 
    `import ${image.replace(/-/g, '')} from '../../assets/${image}.jpg';`
  ).join('\n');
  
  // Add imports after existing imports
  const importSection = content.match(/import.*from.*assets.*jpg.*\n/g);
  if (importSection) {
    const lastImport = importSection[importSection.length - 1];
    const insertIndex = content.indexOf(lastImport) + lastImport.length;
    content = content.slice(0, insertIndex) + '\n' + importStatements + '\n' + content.slice(insertIndex);
  }
  
  // Update imageUrl for each blog post
  blogImageMapping.forEach(({ id, image }) => {
    const imageVar = image.replace(/-/g, '');
    const regex = new RegExp(`(id: '${id}',[\\s\\S]*?imageUrl: )[^,]+`, 'g');
    content = content.replace(regex, `$1${imageVar}`);
  });
  
  fs.writeFileSync(filePath, content);
  console.log('Updated legalInsightsPosts.ts with new images');
}

// Main execution
function main() {
  try {
    createPlaceholderImages();
    updateBlogPosts();
    console.log('\n✅ Successfully set up 25 unique images!');
    console.log('\n📋 Next Steps:');
    console.log('1. Generate 25 AI images using the prompts in ai-image-prompts.md');
    console.log('2. Replace the placeholder files with your actual images');
    console.log('3. Run this script again to update the blog posts');
    console.log('4. Test your website to see all 25 unique images!');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main(); 