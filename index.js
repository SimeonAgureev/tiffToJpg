const fs = require('fs')
const path = require('path')
const Jimp = require("jimp")
const gm = require('gm')
const sharp = require('sharp')

const tiffWays = []

const interiorPath = 'int'
const texturePath = 'tex'
let collections = []

const convertFile = (pathToFile) => {
  const fileName = null
  sharp(`${dirPath}/${item}`)
    // .resize(2000)
    .jpeg({
      quantity: 80
    })
    .toFile(`completeBelveder/${dirPath}/${name}.jpeg`, function (err) {
      if (err) {
        console.log(err)
      } else {
        console.log('complete convert: ', item)
      }
    });
}

const findWays = async (dirPath) => {
  await fs.readdir(path.join(__dirname, dirPath), (err, files) => {
    if (err) throw err
    files.forEach((item, index) => {
      if (item.indexOf('.') < 0) {
        findWays(`${dirPath}/${item}`)
        collections.push(`${dirPath}/${item}`)
        console.log('find...')
      } else if (item.indexOf('.tif') >= 0) {
        console.log('tiff')
        const name = item.slice(0, item.length - 4)
        sharp(`${dirPath}/${item}`)
          // .resize(2000)
          .jpeg({
            quantity: 80
          })
          .toFile(`completeBelveder/${dirPath}/${name}.jpeg`, function (err) {
            if (err) {
              console.log(err)
            } else {
              console.log('complete convert: ', item)
            }
            // output.jpg is a 300 pixels wide and 200 pixels high image
            // containing a scaled and cropped version of input.jpg
          });
      } else if (item.indexOf('.png') >= 0) {
        console.log('png')
        const name = item.slice(0, item.length - 4)
        sharp(`${dirPath}/${item}`)
          // .resize(2000)
          .png()
          .toFile(`completeBelveder/${dirPath}/${name}.png`, function (err) {
            if (err) {
              console.log(err)
            } else {
              console.log('complete optimize png: ', item)
            }
            // output.jpg is a 300 pixels wide and 200 pixels high image
            // containing a scaled and cropped version of input.jpg
          });
      } else if (item.indexOf('.jpg') >= 0 || item.indexOf('.jpeg') >= 0) {
        const name = item.slice(0, item.length - 4)
        if (item.indexOf('.jpeg') >= 0) {
          const name = item.slice(0, item.length - 5)
        } else {
          const name = item.slice(0, item.length - 4)
        }
        console.log('jpg/jpeg')
        sharp(`${dirPath}/${item}`)
          // .resize(2000)
          .jpeg({
            quantity: 80
          })
          .toFile(`completeBelveder/${dirPath}/${name}.jpg`, function (err) {
            if (err) {
              console.log(err)
            } else {
              console.log('complete optimize jpg\jpeg: ', item)
            }
          });
      } else {
        console.log('copyfile')
        fs.copyFile(path.join(dirPath, item), path.join('completeBelveder', dirPath, item), err => {
          if (err) {
            console.log(item)
            throw err
          }
          console.log('successCopy', item)
        })
      }
    })
    console.log('success ')
  })

  collections.forEach(async (item) => {
    await fs.mkdir(path.join(__dirname, 'completeBelveder', item), {
      recursive: true
    }, (err) => {
      // console.log(err)
    })
  })
}

findWays('collection')