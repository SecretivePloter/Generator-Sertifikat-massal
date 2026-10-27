import { createHash } from 'node:crypto'
import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = new URL('../public/sertifikat/', import.meta.url)
const manifest = new URL('SHA256SUMS.txt', root)
const rows = (await readFile(manifest, 'utf8')).trim().split(/\r?\n/).filter(line => !line.endsWith('  Template_Sertifikat.csv')).map(line => {
  const match = /^([a-f0-9]{64})  (.+)$/.exec(line)
  if (!match || match[2].includes('..') || match[2].startsWith('/')) throw new Error('Manifest aset tidak valid.')
  return { hash: match[1], name: match[2] }
})
const actual = []
for (const row of rows) {
  const content = await readFile(join(fileURLToPath(root), row.name))
  const hash = createHash('sha256').update(content).digest('hex')
  actual.push(`${hash}  ${row.name}`)
  if (!process.argv.includes('--write') && hash !== row.hash) throw new Error(`Checksum tidak cocok: ${row.name}`)
}
if (process.argv.includes('--write')) await writeFile(manifest, actual.join('\n') + '\n')
console.log(`${rows.length} aset sertifikat ${process.argv.includes('--write') ? 'diperbarui' : 'valid'}.`)
