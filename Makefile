install:
	npm install

clean:
	rm -r ./dist

dev:
	npm run dev	

build:
	npm run build

purge:
	rm -rf ./node_modules
	npm cache clean --force
