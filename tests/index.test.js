const request = require("supertest");
const app = require("../index");

const _ = require("lodash");
const { chunk } = require("lodash");

describe("Index", () => {
  it('Devrait renvoyer "Hello World" sur la route /', async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Hello World");
  });

  it("Devrait renvoyer une erreur 404 sur une route inexistante", async () => {
    const response = await request(app).get("/route-inexistante");
    expect(response.status).toBe(404);
  });
});
describe("API Users", () => {
  it("devrait renvoyer un utilisateur existant avec le code 200", async () => {
    const response = await request(app).get("/users/1");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      name: "Cindy",
    });
  });

  it("devrait renvoyer une erreur 404 pour un utilisateur non existant", async () => {
    const response = await request(app).get("/users/999"); // Utilisateur non existant
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({
      error: "Utilisateur non trouvé",
    });
  });
});

describe("Lodash", () => {
  describe("Chunk", () => {
    beforeEach(() => {
      inputArray = [1, 2, 3, 4, 5, 6, 7];
      chunkSize = 3;
    });
    it("Devrait diviser un tableau en morceaux de taille donnée", () => {
      expect(chunk(inputArray, chunkSize)).toEqual([[1, 2, 3], [4, 5, 6], [7]]);
    });

    // Cas limite
    it("Devrait gérer une taille de morceau invalide", () => {
      chunkSize = -2; // Taille de morceau négative
      expect(chunk(inputArray, chunkSize)).toEqual([]);
    });

    it("Devrait gérer un tableau vide", () => {
      inputArray = [];
      expect(chunk(inputArray, chunkSize)).toEqual([]);
    });

    it("Devrait gérer un tableau vide et une taille de morceau invalide", () => {
      inputArray = [];
      chunkSize = 0; // Taille de morceau nulle
      expect(chunk(inputArray, chunkSize)).toEqual([]);
    });
  });

  //MAP
  describe("Map", () => {
    beforeEach(() => {
      inputArray = [1, 2, 3, 4, 5, 6, 7];
      callback = (x) => x * 2;
    });
    it("Devrait appliquer la fonction callback à tous les éléments d'un tableau", () => {
      expect(_.map(inputArray, callback)).toEqual([2, 4, 6, 8, 10, 12, 14]);
    });

    it("Devrait gérer un tableau vide", () => {
      inputArray = [];
      expect(_.map(inputArray, callback)).toEqual([]);
    });

    it("Devrait gérer une fonction invalide", () => {
      callback = "not a function";
      expect(_.map(inputArray, callback)).toEqual([]);
    });
  });

  //INTERSECTION
  describe("Intersection", () => {
    beforeEach(() => {
      inputArray = [2, 3, 4, 5, 6, 7, 8];
      inputArray2 = [1, 2, 3, 4, 5, 6, 7];
    });
    it("Devrait renvoyer un tableau avec les elements communs aux deux tableaux", () => {
      expect(_.intersection(inputArray, inputArray2)).toEqual([
        2, 3, 4, 5, 6, 7,
      ]);
    });

    it("Devrait gérer un tableau vide", () => {
      inputArray = [];
      expect(_.intersection(inputArray, inputArray2)).toEqual([]);
    });

    it("Devrait gérer une fonction invalide", () => {
      inputArray = "not an array";
      expect(_.intersection(inputArray, inputArray2)).toEqual([]);
    });
  });

  // UNION
  describe("Union", () => {
    let inputArray;
    let inputArray2;

    beforeEach(() => {
      inputArray = [2, 3, 4, 5, 6, 7, 8];
      inputArray2 = [1, 2, 3, 4, 5, 6, 7];
    });

    it("Devrait renvoyer un tableau avec tous les éléments des deux tableaux", () => {
      expect(_.union(inputArray, inputArray2)).toEqual([
        2, 3, 4, 5, 6, 7, 8, 1,
      ]);
    });

    it("Devrait gérer un tableau vide", () => {
      inputArray = [];
      expect(_.union(inputArray, inputArray2)).toEqual(inputArray2);
    });

    it("Devrait gérer une fonction invalide", () => {
      inputArray = "not an array";
      expect(_.union(inputArray, inputArray2)).toEqual(inputArray2);
    });
  });

  //FLAT MAP
  describe("FlatMap", () => {
    let inputArray;
    let callback;

    beforeEach(() => {
      inputArray = [1, 2, 3, 4, 5, 6, 7];
      callback = (x) => [x, x];
    });

    it("Devrait appliquer la fonction callback à tous les éléments d'un tableau et aplatir le résultat", () => {
      expect(_.flatMap(inputArray, callback)).toEqual([
        1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7,
      ]);
    });

    it("Devrait gérer un tableau vide", () => {
      inputArray = [];
      expect(_.flatMap(inputArray, callback)).toEqual([]);
    });

    it("Devrait gérer une fonction invalide", () => {
      callback = "not a function";
      expect(_.flatMap(inputArray, callback)).toEqual([]);
    });
  });

  //MAX
  describe("Max", () => {
    let inputArray;

    beforeEach(() => {
      inputArray = [1, 2, 3, 99, 5, 6, 7];
    });

    it("Devrait renvoyer la valeur maximale d'un tableau", () => {
      expect(_.max(inputArray)).toEqual(99);
    });

    it("Devrait gérer un tableau vide", () => {
      inputArray = [];
      expect(_.max(inputArray)).toEqual(undefined);
    });

    it("Devrait gérer une fonction invalide", () => {
      inputArray = "not z an array";
      expect(_.max(inputArray)).toEqual("z");
    });

    it("Devrait gérer un tableau de chaînes de caractères", () => {
      inputArray = ["a", "b", "c", 4];
      expect(_.max(inputArray)).toEqual("c");
    });
  });

  //MAX BY
  describe("MaxBy", () => {
    // Cas nominal
    it("Devrait renvoyer l'élément avec la plus grande valeur de la propriété spécifiée", () => {
      const inputArray = [
        { name: "Alice", age: 30 },
        { name: "Bob", age: 25 },
        { name: "Charlie", age: 35 },
      ];

      const result = _.maxBy(inputArray, "age");
      expect(result).toEqual({ name: "Charlie", age: 35 });
    });

    // Cas limite
    it("Devrait renvoyer undefined pour un tableau vide", () => {
      const inputArray = [];
      const result = _.maxBy(inputArray, "age");
      expect(result).toBeUndefined();
    });

    it("Devrait renvoyer undefined si la propriété spécifiée n'existe pas dans les objets du tableau", () => {
      const inputArray = [
        { name: "Alice", height: 160 },
        { name: "Bob", height: 175 },
        { name: "Charlie", height: 150 },
      ];

      const result = _.maxBy(inputArray, "age"); // La propriété 'age' n'existe pas
      expect(result).toBeUndefined();
    });

    it("Devrait renvoyer le premier élément si plusieurs éléments ont la même valeur maximale", () => {
      const inputArray = [
        { name: "Alice", age: 30 },
        { name: "Bob", age: 35 },
        { name: "Charlie", age: 35 },
      ];

      const result = _.maxBy(inputArray, "age");
      expect(result).toEqual({ name: "Bob", age: 35 });
    });
  });
});
