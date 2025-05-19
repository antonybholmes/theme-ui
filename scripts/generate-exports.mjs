// scripts/generate-exports.ts
import fs from 'fs'
import path from 'path'

const srcDir = path.resolve('src')
const distDir = path.resolve('dist')
const packageJsonPath = path.resolve('package.json')

function findTSModules(dir, relativeRoot = '') {
  const items = fs.readdirSync(dir, { withFileTypes: true })
  let paths = []

  for (const item of items) {
    const relPath = path.join(relativeRoot, item.name)
    const fullPath = path.join(dir, item.name)

    console.log(fullPath)

    if (item.isDirectory()) {
      paths = paths.concat(findTSModules(fullPath, relPath))
    } else if (
      (item.name.endsWith('.ts') || item.name.endsWith('.tsx')) &&
      !item.name.endsWith('.d.ts')
    ) {
      const withoutExt = relPath.replace(/\.tsx$/, '').replace(/\.ts$/, '')
      paths.push(withoutExt.replace(/\\/g, '/')) // Ensure POSIX paths
    }
  }

  return paths
}

const modulePaths = findTSModules(srcDir)
const exportsMap = {}

for (const p of modulePaths) {
  exportsMap[`./${p}`] = `./dist/${p}.js`
}

const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
pkg.exports = exportsMap

fs.writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2))
console.log('✔ Updated package.json with exports')
