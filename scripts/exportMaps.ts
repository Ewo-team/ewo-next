const fs = require('fs');
const path = require('path');

const source = path.resolve(__dirname, '..', 'mapmaking');
const destination = path.resolve(__dirname, '..', 'src', 'engine', 'resources', 'maps');

fs.mkdirSync(destination, { recursive: true });

const tilesetsPath = [];
const tilesets = {};
const maps = [];

const files = fs.readdirSync(source);

const tileTypes = {
  block: { block: 1 },
  path: { cost: 0.5 },
  wild: { cost: 2 },
};

// first, sorting maps and tilesets
files.forEach(file => {
  if (file.startsWith('map_')) {
    maps.push(file);
  }

  if (file.startsWith('tileset_')) {
    tilesetsPath.push(file);
  }
});

tilesetsPath.forEach(tilesetPath => {
  tilesets[tilesetPath] = JSON.parse(fs.readFileSync(path.resolve(source, tilesetPath), { encoding: 'utf8' }));
});

maps.forEach(mapPath => {
  const map = JSON.parse(fs.readFileSync(path.resolve(source, mapPath), { encoding: 'utf8' }));
  const height = map.height;
  const width = map.width;

  // only one tilesets is supported for the moment
  const tileset = tilesets[map.tilesets[0].source];

  const blockGrid = [];
  const metaGrid = [];
  const tileGrid = [];

  for (let line = 0; line < height; line += 1) {
    const arrBlock = [];
    const arrMeta = [];
    const arrTile = [];
    for (let column = 0; column < width; column += 1) {
      arrBlock.push(0);
      arrMeta.push(null);
      arrTile.push({});
    }
    blockGrid.push(arrBlock);
    metaGrid.push(arrMeta);
    tileGrid.push(arrTile);
  }

  map.layers.forEach(layer => {
    if (layer.type === 'tilelayer') {
      layer.data.forEach((tile, index) => {
        // only one tilesets is supported for the moment
        const tileId = tile - map.tilesets[0].firstgid;
        const tileDef = tileset.tiles.find(t => t.id === tileId);
        const line = Math.floor(index / width);
        const column = index % width;

        let definition = { block: 0, cost: 1 };

        if (tileDef !== undefined && tileDef.type !== undefined) {
          definition = { ...definition, ...tileTypes[tileDef.type] };
        }

        if (blockGrid[line][column] === 0) {
          blockGrid[line][column] = definition.block;
        }

        if (tileId !== -1) {
          tileGrid[line][column][layer.id] = tileId;
        }

        if (definition.cost !== 1) {
          if (metaGrid[line][column] === null) {
            metaGrid[line][column] = { cost: definition.cost };
          } else if (metaGrid[line][column].cost < definition.cost) {
            metaGrid[line][column].cost = definition.cost;
          }
        }

      });
    }

  });

  const saveMapPath = path.resolve(destination, `${mapPath.substr(0, mapPath.length - 5)}.ts`);
  const stringBlockGrid = blockGrid.map(l => `      [${l.join(', ')}],\n`).join('');
  const stringMetaGrid = metaGrid.map(l => `      [${l.map(c => JSON.stringify(c)).join(',')}],\n`).join('').replace(/"/g, '');
  const stringTileGrid = tileGrid.map(l => `      [${l.map(c => JSON.stringify(c)).join(',')}],\n`).join('').replace(/"/g, '');

  fs.writeFileSync(saveMapPath, `export default {
    // tslint:disable
    block: [\n${stringBlockGrid}    ],
    meta: [\n${stringMetaGrid}    ],
    tiles: [\n${stringTileGrid}    ],
  };\n`);

});
