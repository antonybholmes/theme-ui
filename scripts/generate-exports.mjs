import fs from 'fs'
import path from 'path'

const distDir = path.resolve('dist')
const pkgPath = path.resolve('package.json')

// Helper to recursively find all `.js` files
function findJsFiles(dir, base = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  let files = []

  for (const entry of entries) {
    const relPath = path.join(base, entry.name)
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      files = files.concat(findJsFiles(fullPath, relPath))
    } else if (entry.name.endsWith('.js')) {
      const exportPath = './' + relPath.replace(/\.js$/, '').replace(/\\/g, '/')
      const jsFile = './dist/' + relPath.replace(/\\/g, '/')
      const dtsFile = jsFile.replace(/\.js$/, '.d.ts')

      files.push([exportPath, jsFile, dtsFile])
    }
  }

  return files
}

// Generate exports
function generateExports() {
  const jsFiles = findJsFiles(distDir)
  const exports = {
    './package.json': './package.json',
  }

  for (const [key, jsFile, dtsFile] of jsFiles) {
    exports[key] = {
      import: jsFile,
      types: dtsFile,
    }
  }

  return exports
}

// Update package.json
function updatePackageJson() {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))
  pkg.exports = generateExports()

  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2))
  console.log('✅ package.json "exports" field updated!')
}

updatePackageJson()
