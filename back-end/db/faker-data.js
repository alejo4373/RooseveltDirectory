require('dotenv').config() // Load DATABASE_URL to ENV
const faker = require('faker')
const slugify = require('slugify')
const { db, pgpAs } = require('./pgp')

let SQL = `
  INSERT INTO businesses 
    (name, name_slug, phone, address_1, address_2, description, thumb_img, keywords, active, status)
    VALUES 
`
let rows = []
let ROWS_COUNT = 500;

for (let i = 1; i <= ROWS_COUNT; i++) {
  let business = {
    name: faker.company.companyName(),
    phone: faker.phone.phoneNumber('(!##) !##-####'),
    address_1: `${faker.address.streetAddress()}, ${faker.address.stateAbbr()}, ${faker.address.zipCode()}`,
    address_2: faker.address.secondaryAddress(),
    description: faker.company.catchPhrase(),
    thumb_img: `https://picsum.photos/640/480?random=${(i % 100) + 1}`,
    active: true, //faker.datatype.boolean(),
    status: 'PENDING APPROVAL'
  }
  business.name_slug = slugify(business.name.toLowerCase(), { remove: /[*+~.,()'"!:@]/g })
  business.keywords = business.description.toLowerCase()

  let row = pgpAs.format(`($/name/, $/name_slug/, $/phone/, $/address_1/, $/address_2/, $/description/, $/thumb_img/, $/keywords/, $/active/, $/status/)`, business)
  rows.push(row)
}

SQL += rows.join(',\n')

const addBusinessesToCategories = async () => {
  const SQL = `
    INSERT INTO business_categories(business_id, category_id)
    SELECT id, (id / 21) + 1 FROM businesses WHERE id > 3;
  `
  await db.any(SQL)
  console.log('SUCCESS: Adding business to categories')
}

const main = async () => {
  try {
    await db.any(SQL)
    console.log('Success adding businesses')
    await addBusinessesToCategories()
    console.log('SUCCESS ALL')
    process.exit(0)

  } catch (err) {
    console.error('There was an error', err)
  }
}

main()
