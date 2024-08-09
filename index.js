class BucketAPI {
  constructor() {
    this.fs = require("fs");
    this.path = require("path");
    this.storage = this.path.join(__dirname, "./bucket/");
  }

  store(file, type = "txt") {
    switch (type) {
      case "txt":
        const f = this.fs.readFileSync(this.path.join(process.cwd(), file));
        const name = this.path.basename(file);
        this.fs.writeFileSync(this.path.join(this.storage, name), f);
        break;

      case "img":
        let fname = this.path.basename(this.path.join(process.cwd(), file));
        this.fs.readFile(this.path.join(process.cwd(), file), (err, data) => {
          if (err) throw err;
          this.fs.writeFile(
            this.path.join(this.storage, fname),
            data,
            (err) => {
              if (err) throw err;
            },
          );
        });
        break;
    }
  }

  link(file) {
    const name = this.path.basename(file);
    return this.path.join(this.storage, name);
  }

  extract(file, path_location_without_file_base_name) {
    const name = this.path.basename(file);
    const f = this.fs.readFileSync(this.path.join(this.storage, name));
    const loc = this.path.join(
      process.cwd(),
      path_location_without_file_base_name,
    );
    this.fs.writeFileSync(this.path.join(loc, name), f);
  }

  remove(file) {
    const name = this.path.basename(file);
    this.fs.unlinkSync(this.path.join(this.storage, name));
  }
}

module.exports = BucketAPI;
