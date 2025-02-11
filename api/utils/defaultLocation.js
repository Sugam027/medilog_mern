// const City = require("../models/City");
// const District = require("../models/District");
// const State = require("../models/State");
// const data = require("./default.json");
import City from '../models/City.js'
import District from '../models/District.js'
import State from '../models/State.js'
// import data from '../utils/default.json' assert { type: 'json' };


const defaultLocation = async () => {
  try {
    let locationExists = (await State.find()).length;
    if (locationExists == 0) {
      let stateIds = [];
      for (const stateData of data.states) {
        const newState = await State.create({
          number: stateData.formal_name,
          name: stateData.province_name,
        });
        stateIds.push([stateData.province_id, newState._id]);
      }

      await District.deleteMany({});
      let districtIds = [];
      for (const district of data.districts) {
        const correspondingStateId = stateIds.find(
          (stateId) => stateId[0] == district.province_id
        )[1];
        const newDistrict = await District.create({
          name: district.district_name,
          state: correspondingStateId,
        });
        districtIds.push([district.district_id, newDistrict._id]);
      }

      await City.deleteMany({});
      for (const city of data.cities) {
        const correspondingDistrictId = districtIds.find(
          (districtId) => districtId[0] == city.district_id
        )[1];
        const newCity = await City.create({
          name: city.municipality_name,
          district: correspondingDistrictId,
        });
      }

      console.log("Location Data Created");
    }
  } catch (err) {
    console.log(err.message);
  }
};

// module.exports = defaultLocation;
export default defaultLocation


const data = {
  "states": [
    {
      "province_id": 4,
      "formal_name": "Province no. 4",
      "province_name": "Gandaki Pradesh"
    },
    {
      "province_id": 6,
      "formal_name": "Province no. 6",
      "province_name": "Karnali Pradesh"
    },
    {
      "province_id": 1,
      "formal_name": "Province no. 1",
      "province_name": "Koshi Pradesh"
    },
    {
      "province_id": 2,
      "formal_name": "Province no. 2",
      "province_name": "Madhesh Pradesh"
    },
    {
      "province_id": 3,
      "formal_name": "Province no. 3",
      "province_name": "Bagmati Pradesh"
    },
    {
      "province_id": 5,
      "formal_name": "Province no. 5",
      "province_name": "Lumbini Pradesh"
    },
    {
      "province_id": 7,
      "formal_name": "Province no. 7",
      "province_name": "Sudurpashchim Pradesh"
    }
  ],
  "districts": [
    {
      "district_id": 1,
      "district_name": "Bhojpur",
      "province_id": 1
    },
    {
      "district_id": 2,
      "district_name": "Dhankuta",
      "province_id": 1
    },
    {
      "district_id": 3,
      "district_name": "Ilam",
      "province_id": 1
    },
    {
      "district_id": 4,
      "district_name": "Jhapa",
      "province_id": 1
    },
    {
      "district_id": 5,
      "district_name": "Khotang",
      "province_id": 1
    },
    {
      "district_id": 6,
      "district_name": "Morang",
      "province_id": 1
    },
    {
      "district_id": 7,
      "district_name": "Okhaldhunga",
      "province_id": 1
    },
    {
      "district_id": 8,
      "district_name": "Panchthar",
      "province_id": 1
    },
    {
      "district_id": 9,
      "district_name": "Sankhuwasabha",
      "province_id": 1
    },
    {
      "district_id": 10,
      "district_name": "Solukhumbu",
      "province_id": 1
    },
    {
      "district_id": 11,
      "district_name": "Sunsari",
      "province_id": 1
    },
    {
      "district_id": 12,
      "district_name": "Taplejung",
      "province_id": 1
    },
    {
      "district_id": 13,
      "district_name": "Terhathum",
      "province_id": 1
    },
    {
      "district_id": 14,
      "district_name": "Udayapur",
      "province_id": 1
    },
    {
      "district_id": 15,
      "district_name": "Saptari",
      "province_id": 2
    },
    {
      "district_id": 16,
      "district_name": "Siraha",
      "province_id": 2
    },
    {
      "district_id": 17,
      "district_name": "Dhanusha",
      "province_id": 2
    },
    {
      "district_id": 18,
      "district_name": "Mahottari",
      "province_id": 2
    },
    {
      "district_id": 19,
      "district_name": "Sarlahi",
      "province_id": 2
    },
    {
      "district_id": 20,
      "district_name": "Bara",
      "province_id": 2
    },
    {
      "district_id": 21,
      "district_name": "Parsa",
      "province_id": 2
    },
    {
      "district_id": 22,
      "district_name": "Rautahat",
      "province_id": 2
    },
    {
      "district_id": 23,
      "district_name": "Sindhuli",
      "province_id": 3
    },
    {
      "district_id": 24,
      "district_name": "Ramechhap",
      "province_id": 3
    },
    {
      "district_id": 25,
      "district_name": "Dolakha",
      "province_id": 3
    },
    {
      "district_id": 26,
      "district_name": "Bhaktapur",
      "province_id": 3
    },
    {
      "district_id": 27,
      "district_name": "Dhading",
      "province_id": 3
    },
    {
      "district_id": 28,
      "district_name": "Kathmandu",
      "province_id": 3
    },
    {
      "district_id": 29,
      "district_name": "Kavrepalanchowk",
      "province_id": 3
    },
    {
      "district_id": 30,
      "district_name": "Lalitpur",
      "province_id": 3
    },
    {
      "district_id": 31,
      "district_name": "Nuwakot",
      "province_id": 3
    },
    {
      "district_id": 32,
      "district_name": "Rasuwa",
      "province_id": 3
    },
    {
      "district_id": 33,
      "district_name": "Sindhupalchok",
      "province_id": 3
    },
    {
      "district_id": 34,
      "district_name": "Chitwan",
      "province_id": 3
    },
    {
      "district_id": 35,
      "district_name": "Makwanpur",
      "province_id": 3
    },
    {
      "district_id": 36,
      "district_name": "Baglung",
      "province_id": 4
    },
    {
      "district_id": 37,
      "district_name": "Gorkha",
      "province_id": 4
    },
    {
      "district_id": 38,
      "district_name": "Kaski",
      "province_id": 4
    },
    {
      "district_id": 39,
      "district_name": "Lamjung",
      "province_id": 4
    },
    {
      "district_id": 40,
      "district_name": "Manang",
      "province_id": 4
    },
    {
      "district_id": 41,
      "district_name": "Mustang",
      "province_id": 4
    },
    {
      "district_id": 42,
      "district_name": "Myagdi",
      "province_id": 4
    },
    {
      "district_id": 43,
      "district_name": "Nawalpur",
      "province_id": 4
    },
    {
      "district_id": 44,
      "district_name": "Parbat",
      "province_id": 4
    },
    {
      "district_id": 45,
      "district_name": "Syangja",
      "province_id": 4
    },
    {
      "district_id": 46,
      "district_name": "Tanahun",
      "province_id": 4
    },
    {
      "district_id": 47,
      "district_name": "Kapilvastu",
      "province_id": 5
    },
    {
      "district_id": 48,
      "district_name": "Parasi",
      "province_id": 5
    },
    {
      "district_id": 49,
      "district_name": "Rupandehi",
      "province_id": 5
    },
    {
      "district_id": 50,
      "district_name": "Arghakhanchi",
      "province_id": 5
    },
    {
      "district_id": 51,
      "district_name": "Gulmi",
      "province_id": 5
    },
    {
      "district_id": 52,
      "district_name": "Palpa",
      "province_id": 5
    },
    {
      "district_id": 53,
      "district_name": "Dang",
      "province_id": 5
    },
    {
      "district_id": 54,
      "district_name": "Pyuthan",
      "province_id": 5
    },
    {
      "district_id": 55,
      "district_name": "Rolpa",
      "province_id": 5
    },
    {
      "district_id": 56,
      "district_name": "Eastern Rukum",
      "province_id": 5
    },
    {
      "district_id": 57,
      "district_name": "Banke",
      "province_id": 5
    },
    {
      "district_id": 58,
      "district_name": "Bardiya",
      "province_id": 5
    },
    {
      "district_id": 59,
      "district_name": "Western Rukum",
      "province_id": 6
    },
    {
      "district_id": 60,
      "district_name": "Salyan",
      "province_id": 6
    },
    {
      "district_id": 61,
      "district_name": "Dolpa",
      "province_id": 6
    },
    {
      "district_id": 62,
      "district_name": "Humla",
      "province_id": 6
    },
    {
      "district_id": 63,
      "district_name": "Jumla",
      "province_id": 6
    },
    {
      "district_id": 64,
      "district_name": "Kalikot",
      "province_id": 6
    },
    {
      "district_id": 65,
      "district_name": "Mugu",
      "province_id": 6
    },
    {
      "district_id": 66,
      "district_name": "Surkhet",
      "province_id": 6
    },
    {
      "district_id": 67,
      "district_name": "Dailekh",
      "province_id": 6
    },
    {
      "district_id": 68,
      "district_name": "Jajarkot",
      "province_id": 6
    },
    {
      "district_id": 69,
      "district_name": "Kailali",
      "province_id": 7
    },
    {
      "district_id": 70,
      "district_name": "Achham",
      "province_id": 7
    },
    {
      "district_id": 71,
      "district_name": "Doti",
      "province_id": 7
    },
    {
      "district_id": 72,
      "district_name": "Bajhang",
      "province_id": 7
    },
    {
      "district_id": 73,
      "district_name": "Bajura",
      "province_id": 7
    },
    {
      "district_id": 74,
      "district_name": "Kanchanpur",
      "province_id": 7
    },
    {
      "district_id": 75,
      "district_name": "Dadeldhura",
      "province_id": 7
    },
    {
      "district_id": 76,
      "district_name": "Baitadi",
      "province_id": 7
    },
    {
      "district_id": 77,
      "district_name": "Darchula",
      "province_id": 7
    }
  ],
  "cities": [
    {
      "municipality_id": 1,
      "municipality_name": "Aamargadhi",
      "district_id": 75
    },
    {
      "municipality_id": 2,
      "municipality_name": "Aathabis",
      "district_id": 67
    },
    {
      "municipality_id": 3,
      "municipality_name": "Aathabiskot",
      "district_id": 59
    },
    {
      "municipality_id": 4,
      "municipality_name": "Arjundhara",
      "district_id": 4
    },
    {
      "municipality_id": 5,
      "municipality_name": "Aurahi",
      "district_id": 18
    },
    {
      "municipality_id": 6,
      "municipality_name": "Badimalika",
      "district_id": 73
    },
    {
      "municipality_id": 7,
      "municipality_name": "Bagchaur",
      "district_id": 60
    },
    {
      "municipality_id": 8,
      "municipality_name": "Baglung",
      "district_id": 36
    },
    {
      "municipality_id": 9,
      "municipality_name": "Bagmati",
      "district_id": 19
    },
    {
      "municipality_id": 10,
      "municipality_name": "Bahudarmai",
      "district_id": 21
    },
    {
      "municipality_id": 11,
      "municipality_name": "Balara",
      "district_id": 19
    },
    {
      "municipality_id": 12,
      "municipality_name": "Balawa",
      "district_id": 18
    },
    {
      "municipality_id": 13,
      "municipality_name": "Banepa",
      "district_id": 29
    },
    {
      "municipality_id": 14,
      "municipality_name": "Bangad Kupinde",
      "district_id": 60
    },
    {
      "municipality_id": 15,
      "municipality_name": "Banganga",
      "district_id": 47
    },
    {
      "municipality_id": 16,
      "municipality_name": "Bansgadhi",
      "district_id": 58
    },
    {
      "municipality_id": 17,
      "municipality_name": "Barahachhetra",
      "district_id": 11
    },
    {
      "municipality_id": 18,
      "municipality_name": "Barahathawa",
      "district_id": 19
    },
    {
      "municipality_id": 19,
      "municipality_name": "Barbardiya",
      "district_id": 58
    },
    {
      "municipality_id": 20,
      "municipality_name": "Bardghat",
      "district_id": 48
    },
    {
      "municipality_id": 21,
      "municipality_name": "Bardibas",
      "district_id": 18
    },
    {
      "municipality_id": 22,
      "municipality_name": "Barhabise",
      "district_id": 33
    },
    {
      "municipality_id": 23,
      "municipality_name": "Baudhimai",
      "district_id": 22
    },
    {
      "municipality_id": 24,
      "municipality_name": "Bedkot",
      "district_id": 74
    },
    {
      "municipality_id": 25,
      "municipality_name": "Belaka",
      "district_id": 14
    },
    {
      "municipality_id": 26,
      "municipality_name": "Belauri",
      "district_id": 74
    },
    {
      "municipality_id": 27,
      "municipality_name": "Belbaari",
      "district_id": 6
    },
    {
      "municipality_id": 28,
      "municipality_name": "Belkotgadhi",
      "district_id": 31
    },
    {
      "municipality_id": 29,
      "municipality_name": "Beni",
      "district_id": 42
    },
    {
      "municipality_id": 30,
      "municipality_name": "Besishahar",
      "district_id": 39
    },
    {
      "municipality_id": 31,
      "municipality_name": "Bhadrapur",
      "district_id": 4
    },
    {
      "municipality_id": 32,
      "municipality_name": "Bhajani",
      "district_id": 69
    },
    {
      "municipality_id": 33,
      "municipality_name": "Bhaktapur",
      "district_id": 26
    },
    {
      "municipality_id": 34,
      "municipality_name": "Bhangaha",
      "district_id": 18
    },
    {
      "municipality_id": 35,
      "municipality_name": "Bhanu",
      "district_id": 46
    },
    {
      "municipality_id": 36,
      "municipality_name": "Bharatpur",
      "district_id": 34
    },
    {
      "municipality_id": 37,
      "municipality_name": "Bheemdatta",
      "district_id": 74
    },
    {
      "municipality_id": 38,
      "municipality_name": "Bheerkot",
      "district_id": 45
    },
    {
      "municipality_id": 39,
      "municipality_name": "Bheri",
      "district_id": 68
    },
    {
      "municipality_id": 40,
      "municipality_name": "Bheriganga",
      "district_id": 66
    },
    {
      "municipality_id": 41,
      "municipality_name": "Bhimad",
      "district_id": 46
    },
    {
      "municipality_id": 42,
      "municipality_name": "Bhimeshwar",
      "district_id": 25
    },
    {
      "municipality_id": 43,
      "municipality_name": "Bhojpur",
      "district_id": 1
    },
    {
      "municipality_id": 44,
      "municipality_name": "Bhumikasthan",
      "district_id": 50
    },
    {
      "municipality_id": 45,
      "municipality_name": "Bideha",
      "district_id": 17
    },
    {
      "municipality_id": 46,
      "municipality_name": "Bidur",
      "district_id": 31
    },
    {
      "municipality_id": 47,
      "municipality_name": "Biratnagar",
      "district_id": 6
    },
    {
      "municipality_id": 48,
      "municipality_name": "Birendranagar",
      "district_id": 66
    },
    {
      "municipality_id": 49,
      "municipality_name": "Birgunj",
      "district_id": 21
    },
    {
      "municipality_id": 50,
      "municipality_name": "Birtamod",
      "district_id": 4
    },
    {
      "municipality_id": 51,
      "municipality_name": "Bode Barsain",
      "district_id": 15
    },
    {
      "municipality_id": 52,
      "municipality_name": "Brindaban",
      "district_id": 22
    },
    {
      "municipality_id": 53,
      "municipality_name": "Buddhabhumi",
      "district_id": 47
    },
    {
      "municipality_id": 54,
      "municipality_name": "Budhanilkantha",
      "district_id": 28
    },
    {
      "municipality_id": 55,
      "municipality_name": "Budhiganga",
      "district_id": 73
    },
    {
      "municipality_id": 56,
      "municipality_name": "Budhinanda",
      "district_id": 73
    },
    {
      "municipality_id": 57,
      "municipality_name": "Bungal",
      "district_id": 72
    },
    {
      "municipality_id": 58,
      "municipality_name": "Butwal",
      "district_id": 49
    },
    {
      "municipality_id": 59,
      "municipality_name": "Chainpur",
      "district_id": 9
    },
    {
      "municipality_id": 60,
      "municipality_name": "Chamunda Bindrasaini",
      "district_id": 67
    },
    {
      "municipality_id": 61,
      "municipality_name": "Chandannath",
      "district_id": 63
    },
    {
      "municipality_id": 62,
      "municipality_name": "Chandragiri",
      "district_id": 28
    },
    {
      "municipality_id": 63,
      "municipality_name": "Chandrapur",
      "district_id": 22
    },
    {
      "municipality_id": 64,
      "municipality_name": "Changunarayan",
      "district_id": 26
    },
    {
      "municipality_id": 65,
      "municipality_name": "Chapakot",
      "district_id": 45
    },
    {
      "municipality_id": 66,
      "municipality_name": "Chaudandigadhi",
      "district_id": 14
    },
    {
      "municipality_id": 67,
      "municipality_name": "Chaurjahari",
      "district_id": 59
    },
    {
      "municipality_id": 68,
      "municipality_name": "Chautara Sangachowkgadhi",
      "district_id": 33
    },
    {
      "municipality_id": 69,
      "municipality_name": "Chhayanath Rara",
      "district_id": 65
    },
    {
      "municipality_id": 70,
      "municipality_name": "Chhedagad",
      "district_id": 68
    },
    {
      "municipality_id": 71,
      "municipality_name": "Dakneshwari",
      "district_id": 15
    },
    {
      "municipality_id": 72,
      "municipality_name": "Damak",
      "district_id": 4
    },
    {
      "municipality_id": 73,
      "municipality_name": "Dasharath Chand",
      "district_id": 76
    },
    {
      "municipality_id": 74,
      "municipality_name": "Daxinkaali",
      "district_id": 28
    },
    {
      "municipality_id": 75,
      "municipality_name": "Deumai",
      "district_id": 3
    },
    {
      "municipality_id": 76,
      "municipality_name": "Devchuli",
      "district_id": 43
    },
    {
      "municipality_id": 77,
      "municipality_name": "Devdaha",
      "district_id": 49
    },
    {
      "municipality_id": 78,
      "municipality_name": "Dewahi Gonahi",
      "district_id": 22
    },
    {
      "municipality_id": 79,
      "municipality_name": "Dhangadhi",
      "district_id": 69
    },
    {
      "municipality_id": 80,
      "municipality_name": "Dhangadimai",
      "district_id": 16
    },
    {
      "municipality_id": 81,
      "municipality_name": "Dhankuta",
      "district_id": 2
    },
    {
      "municipality_id": 82,
      "municipality_name": "Dhanushadham",
      "district_id": 17
    },
    {
      "municipality_id": 83,
      "municipality_name": "Dharan",
      "district_id": 11
    },
    {
      "municipality_id": 84,
      "municipality_name": "Dharmadevi",
      "district_id": 9
    },
    {
      "municipality_id": 85,
      "municipality_name": "Dhorpatan",
      "district_id": 36
    },
    {
      "municipality_id": 86,
      "municipality_name": "Dhulikhel",
      "district_id": 29
    },
    {
      "municipality_id": 87,
      "municipality_name": "Dhunibeshi",
      "district_id": 27
    },
    {
      "municipality_id": 88,
      "municipality_name": "Diktel Rupakot Majuwagadhi",
      "district_id": 5
    },
    {
      "municipality_id": 89,
      "municipality_name": "Dipayal Silgadhi",
      "district_id": 71
    },
    {
      "municipality_id": 90,
      "municipality_name": "Dudhauli",
      "district_id": 23
    },
    {
      "municipality_id": 91,
      "municipality_name": "Duhabi",
      "district_id": 11
    },
    {
      "municipality_id": 92,
      "municipality_name": "Dullu",
      "district_id": 67
    },
    {
      "municipality_id": 93,
      "municipality_name": "Gadhimai",
      "district_id": 22
    },
    {
      "municipality_id": 94,
      "municipality_name": "Gaindakot",
      "district_id": 43
    },
    {
      "municipality_id": 95,
      "municipality_name": "Galkot",
      "district_id": 36
    },
    {
      "municipality_id": 96,
      "municipality_name": "Galyang",
      "district_id": 45
    },
    {
      "municipality_id": 97,
      "municipality_name": "Ganeshman Charnath",
      "district_id": 17
    },
    {
      "municipality_id": 98,
      "municipality_name": "Garuda",
      "district_id": 22
    },
    {
      "municipality_id": 99,
      "municipality_name": "Gaur",
      "district_id": 22
    },
    {
      "municipality_id": 100,
      "municipality_name": "Gauradaha",
      "district_id": 4
    },
    {
      "municipality_id": 101,
      "municipality_name": "Gauriganga",
      "district_id": 69
    },
    {
      "municipality_id": 102,
      "municipality_name": "Gaushala",
      "district_id": 18
    },
    {
      "municipality_id": 103,
      "municipality_name": "Ghodaghodi",
      "district_id": 69
    },
    {
      "municipality_id": 104,
      "municipality_name": "Ghorahi",
      "district_id": 53
    },
    {
      "municipality_id": 105,
      "municipality_name": "Godaita",
      "district_id": 19
    },
    {
      "municipality_id": 106,
      "municipality_name": "Godawari",
      "district_id": 30
    },
    {
      "municipality_id": 107,
      "municipality_name": "Godawari, Seti",
      "district_id": 69
    },
    {
      "municipality_id": 108,
      "municipality_name": "Gokarneshwor",
      "district_id": 28
    },
    {
      "municipality_id": 109,
      "municipality_name": "Golbazar",
      "district_id": 16
    },
    {
      "municipality_id": 110,
      "municipality_name": "Gorkha",
      "district_id": 37
    },
    {
      "municipality_id": 111,
      "municipality_name": "Gujara",
      "district_id": 22
    },
    {
      "municipality_id": 112,
      "municipality_name": "Gulariya",
      "district_id": 58
    },
    {
      "municipality_id": 113,
      "municipality_name": "Gurbhakot",
      "district_id": 66
    },
    {
      "municipality_id": 114,
      "municipality_name": "Halesi Tuwachung",
      "district_id": 5
    },
    {
      "municipality_id": 115,
      "municipality_name": "Hansapur",
      "district_id": 17
    },
    {
      "municipality_id": 116,
      "municipality_name": "Hanumannagar Kankalini",
      "district_id": 15
    },
    {
      "municipality_id": 117,
      "municipality_name": "Haripur",
      "district_id": 19
    },
    {
      "municipality_id": 118,
      "municipality_name": "Haripurwa",
      "district_id": 19
    },
    {
      "municipality_id": 119,
      "municipality_name": "Hariwan",
      "district_id": 19
    },
    {
      "municipality_id": 120,
      "municipality_name": "Hetauda",
      "district_id": 35
    },
    {
      "municipality_id": 121,
      "municipality_name": "Ilam",
      "district_id": 3
    },
    {
      "municipality_id": 122,
      "municipality_name": "Inaruwa",
      "district_id": 11
    },
    {
      "municipality_id": 123,
      "municipality_name": "Ishnath",
      "district_id": 22
    },
    {
      "municipality_id": 124,
      "municipality_name": "Ishworpur",
      "district_id": 19
    },
    {
      "municipality_id": 125,
      "municipality_name": "Itahari",
      "district_id": 11
    },
    {
      "municipality_id": 126,
      "municipality_name": "Jaimini",
      "district_id": 36
    },
    {
      "municipality_id": 127,
      "municipality_name": "Jaleshwar",
      "district_id": 18
    },
    {
      "municipality_id": 128,
      "municipality_name": "Janakpur",
      "district_id": 17
    },
    {
      "municipality_id": 129,
      "municipality_name": "Jaya Prithvi",
      "district_id": 72
    },
    {
      "municipality_id": 130,
      "municipality_name": "Jiri",
      "district_id": 25
    },
    {
      "municipality_id": 131,
      "municipality_name": "Jitpur Simara",
      "district_id": 20
    },
    {
      "municipality_id": 132,
      "municipality_name": "Kabilasi",
      "district_id": 19
    },
    {
      "municipality_id": 133,
      "municipality_name": "Kageshwori Manohara",
      "district_id": 28
    },
    {
      "municipality_id": 134,
      "municipality_name": "Kalaiya",
      "district_id": 20
    },
    {
      "municipality_id": 135,
      "municipality_name": "Kalika",
      "district_id": 34
    },
    {
      "municipality_id": 136,
      "municipality_name": "Kalyanpur",
      "district_id": 16
    },
    {
      "municipality_id": 137,
      "municipality_name": "Kamala",
      "district_id": 17
    },
    {
      "municipality_id": 138,
      "municipality_name": "Kamalamai",
      "district_id": 23
    },
    {
      "municipality_id": 139,
      "municipality_name": "Kamalbazar",
      "district_id": 70
    },
    {
      "municipality_id": 140,
      "municipality_name": "Kanchanrup",
      "district_id": 15
    },
    {
      "municipality_id": 141,
      "municipality_name": "Kankai",
      "district_id": 4
    },
    {
      "municipality_id": 142,
      "municipality_name": "Kapilvastu",
      "district_id": 47
    },
    {
      "municipality_id": 143,
      "municipality_name": "Karjanha",
      "district_id": 16
    },
    {
      "municipality_id": 144,
      "municipality_name": "Katahariya",
      "district_id": 22
    },
    {
      "municipality_id": 145,
      "municipality_name": "Katari",
      "district_id": 14
    },
    {
      "municipality_id": 146,
      "municipality_name": "Kathmandu",
      "district_id": 28
    },
    {
      "municipality_id": 147,
      "municipality_name": "Kawasoti",
      "district_id": 43
    },
    {
      "municipality_id": 148,
      "municipality_name": "Khadak",
      "district_id": 15
    },
    {
      "municipality_id": 149,
      "municipality_name": "Khairhani",
      "district_id": 34
    },
    {
      "municipality_id": 150,
      "municipality_name": "Khandachakra",
      "district_id": 64
    },
    {
      "municipality_id": 151,
      "municipality_name": "Khandbari",
      "district_id": 9
    },
    {
      "municipality_id": 152,
      "municipality_name": "Kirtipur",
      "district_id": 28
    },
    {
      "municipality_id": 153,
      "municipality_name": "Kohalpur",
      "district_id": 57
    },
    {
      "municipality_id": 154,
      "municipality_name": "Kolhabi",
      "district_id": 20
    },
    {
      "municipality_id": 155,
      "municipality_name": "Krishnanagar",
      "district_id": 47
    },
    {
      "municipality_id": 156,
      "municipality_name": "Krishnapur",
      "district_id": 74
    },
    {
      "municipality_id": 157,
      "municipality_name": "Kshireshwor Nath",
      "district_id": 17
    },
    {
      "municipality_id": 158,
      "municipality_name": "Kushma",
      "district_id": 44
    },
    {
      "municipality_id": 159,
      "municipality_name": "Lahan",
      "district_id": 16
    },
    {
      "municipality_id": 160,
      "municipality_name": "Lalbandi",
      "district_id": 19
    },
    {
      "municipality_id": 161,
      "municipality_name": "Laligurans",
      "district_id": 13
    },
    {
      "municipality_id": 162,
      "municipality_name": "Lalitpur",
      "district_id": 30
    },
    {
      "municipality_id": 163,
      "municipality_name": "Lamahi",
      "district_id": 53
    },
    {
      "municipality_id": 164,
      "municipality_name": "Lamki Chuha",
      "district_id": 69
    },
    {
      "municipality_id": 165,
      "municipality_name": "Lekbeshi",
      "district_id": 66
    },
    {
      "municipality_id": 166,
      "municipality_name": "Letang",
      "district_id": 6
    },
    {
      "municipality_id": 167,
      "municipality_name": "Loharpatti",
      "district_id": 18
    },
    {
      "municipality_id": 168,
      "municipality_name": "Lumbini Sanskritik",
      "district_id": 49
    },
    {
      "municipality_id": 169,
      "municipality_name": "Madhav Narayan",
      "district_id": 22
    },
    {
      "municipality_id": 170,
      "municipality_name": "Madhuwan",
      "district_id": 58
    },
    {
      "municipality_id": 171,
      "municipality_name": "Madhya Nepal",
      "district_id": 39
    },
    {
      "municipality_id": 172,
      "municipality_name": "Madhyabindu",
      "district_id": 43
    },
    {
      "municipality_id": 173,
      "municipality_name": "Madhyapur Thimi",
      "district_id": 26
    },
    {
      "municipality_id": 174,
      "municipality_name": "Madi",
      "district_id": 34
    },
    {
      "municipality_id": 175,
      "municipality_name": "Madi",
      "district_id": 9
    },
    {
      "municipality_id": 176,
      "municipality_name": "Mahagadhimai",
      "district_id": 20
    },
    {
      "municipality_id": 177,
      "municipality_name": "Mahakali",
      "district_id": 77
    },
    {
      "municipality_id": 178,
      "municipality_name": "Mahakali",
      "district_id": 74
    },
    {
      "municipality_id": 179,
      "municipality_name": "Mahalaxmi",
      "district_id": 2
    },
    {
      "municipality_id": 180,
      "municipality_name": "Mahalaxmi",
      "district_id": 30
    },
    {
      "municipality_id": 181,
      "municipality_name": "Maharajgunj",
      "district_id": 47
    },
    {
      "municipality_id": 182,
      "municipality_name": "Mai",
      "district_id": 3
    },
    {
      "municipality_id": 183,
      "municipality_name": "Malangwa",
      "district_id": 19
    },
    {
      "municipality_id": 184,
      "municipality_name": "Manara Shisawa",
      "district_id": 18
    },
    {
      "municipality_id": 185,
      "municipality_name": "Mandandeupur",
      "district_id": 29
    },
    {
      "municipality_id": 186,
      "municipality_name": "Mangalsen",
      "district_id": 70
    },
    {
      "municipality_id": 187,
      "municipality_name": "Manthali",
      "district_id": 24
    },
    {
      "municipality_id": 188,
      "municipality_name": "Matihani",
      "district_id": 18
    },
    {
      "municipality_id": 189,
      "municipality_name": "Maulapur",
      "district_id": 22
    },
    {
      "municipality_id": 190,
      "municipality_name": "Mechinagar",
      "district_id": 4
    },
    {
      "municipality_id": 191,
      "municipality_name": "Melamchi",
      "district_id": 33
    },
    {
      "municipality_id": 192,
      "municipality_name": "Melauli",
      "district_id": 76
    },
    {
      "municipality_id": 193,
      "municipality_name": "Mirchaiya",
      "district_id": 16
    },
    {
      "municipality_id": 194,
      "municipality_name": "Mithila",
      "district_id": 17
    },
    {
      "municipality_id": 195,
      "municipality_name": "Mithila Bihari",
      "district_id": 17
    },
    {
      "municipality_id": 196,
      "municipality_name": "Musikot",
      "district_id": 51
    },
    {
      "municipality_id": 197,
      "municipality_name": "Musikot",
      "district_id": 59
    },
    {
      "municipality_id": 198,
      "municipality_name": "Myanglung",
      "district_id": 13
    },
    {
      "municipality_id": 199,
      "municipality_name": "Nagarain",
      "district_id": 17
    },
    {
      "municipality_id": 200,
      "municipality_name": "Nagarjun",
      "district_id": 28
    },
    {
      "municipality_id": 201,
      "municipality_name": "Nalgad",
      "district_id": 68
    },
    {
      "municipality_id": 202,
      "municipality_name": "Namobuddha",
      "district_id": 29
    },
    {
      "municipality_id": 203,
      "municipality_name": "Narayan",
      "district_id": 67
    },
    {
      "municipality_id": 204,
      "municipality_name": "Nepalgunj",
      "district_id": 57
    },
    {
      "municipality_id": 205,
      "municipality_name": "Nijgadh",
      "district_id": 20
    },
    {
      "municipality_id": 206,
      "municipality_name": "Nilkantha",
      "district_id": 27
    },
    {
      "municipality_id": 207,
      "municipality_name": "Pachrauta",
      "district_id": 20
    },
    {
      "municipality_id": 208,
      "municipality_name": "Pakhribas",
      "district_id": 2
    },
    {
      "municipality_id": 209,
      "municipality_name": "Palungtar",
      "district_id": 37
    },
    {
      "municipality_id": 210,
      "municipality_name": "Panchadewal Binayak",
      "district_id": 70
    },
    {
      "municipality_id": 211,
      "municipality_name": "Panchapuri",
      "district_id": 66
    },
    {
      "municipality_id": 212,
      "municipality_name": "Panchkhal",
      "district_id": 29
    },
    {
      "municipality_id": 213,
      "municipality_name": "Panchkhapan",
      "district_id": 9
    },
    {
      "municipality_id": 214,
      "municipality_name": "Parashuram",
      "district_id": 75
    },
    {
      "municipality_id": 215,
      "municipality_name": "Paroha",
      "district_id": 22
    },
    {
      "municipality_id": 216,
      "municipality_name": "Parsagadhi",
      "district_id": 21
    },
    {
      "municipality_id": 217,
      "municipality_name": "Patan",
      "district_id": 76
    },
    {
      "municipality_id": 218,
      "municipality_name": "Pathari Shanischare",
      "district_id": 6
    },
    {
      "municipality_id": 219,
      "municipality_name": "Paunauti",
      "district_id": 29
    },
    {
      "municipality_id": 220,
      "municipality_name": "Phalewas",
      "district_id": 44
    },
    {
      "municipality_id": 221,
      "municipality_name": "Phatuwa Bijayapur",
      "district_id": 22
    },
    {
      "municipality_id": 222,
      "municipality_name": "Phidim",
      "district_id": 8
    },
    {
      "municipality_id": 223,
      "municipality_name": "Phungling",
      "district_id": 12
    },
    {
      "municipality_id": 224,
      "municipality_name": "Pokhara",
      "district_id": 38
    },
    {
      "municipality_id": 225,
      "municipality_name": "Pokhariya",
      "district_id": 21
    },
    {
      "municipality_id": 226,
      "municipality_name": "Punarbas",
      "district_id": 74
    },
    {
      "municipality_id": 227,
      "municipality_name": "Purchaundi",
      "district_id": 76
    },
    {
      "municipality_id": 228,
      "municipality_name": "Putalibaazar",
      "district_id": 45
    },
    {
      "municipality_id": 229,
      "municipality_name": "Pyuthan",
      "district_id": 54
    },
    {
      "municipality_id": 230,
      "municipality_name": "Rainas",
      "district_id": 39
    },
    {
      "municipality_id": 231,
      "municipality_name": "Rajapur",
      "district_id": 58
    },
    {
      "municipality_id": 232,
      "municipality_name": "Rajbiraj",
      "district_id": 15
    },
    {
      "municipality_id": 233,
      "municipality_name": "Rajdevi",
      "district_id": 22
    },
    {
      "municipality_id": 234,
      "municipality_name": "Rajpur",
      "district_id": 22
    },
    {
      "municipality_id": 235,
      "municipality_name": "Ramdhuni",
      "district_id": 11
    },
    {
      "municipality_id": 236,
      "municipality_name": "Ramechhap",
      "district_id": 24
    },
    {
      "municipality_id": 237,
      "municipality_name": "Ramgopalpur",
      "district_id": 18
    },
    {
      "municipality_id": 238,
      "municipality_name": "Ramgram",
      "district_id": 48
    },
    {
      "municipality_id": 239,
      "municipality_name": "Rampur",
      "district_id": 52
    },
    {
      "municipality_id": 240,
      "municipality_name": "Rangeli",
      "district_id": 6
    },
    {
      "municipality_id": 241,
      "municipality_name": "Rapti",
      "district_id": 34
    },
    {
      "municipality_id": 242,
      "municipality_name": "Raskot",
      "district_id": 64
    },
    {
      "municipality_id": 243,
      "municipality_name": "Ratnanagar",
      "district_id": 34
    },
    {
      "municipality_id": 244,
      "municipality_name": "Ratuwamai",
      "district_id": 6
    },
    {
      "municipality_id": 245,
      "municipality_name": "Resunga",
      "district_id": 51
    },
    {
      "municipality_id": 246,
      "municipality_name": "Ropla",
      "district_id": 55
    },
    {
      "municipality_id": 247,
      "municipality_name": "Sabaila",
      "district_id": 17
    },
    {
      "municipality_id": 248,
      "municipality_name": "Sainamaina",
      "district_id": 49
    },
    {
      "municipality_id": 249,
      "municipality_name": "Sandhikharka",
      "district_id": 50
    },
    {
      "municipality_id": 250,
      "municipality_name": "Saphebagar",
      "district_id": 70
    },
    {
      "municipality_id": 251,
      "municipality_name": "Saptakoshi",
      "district_id": 15
    },
    {
      "municipality_id": 252,
      "municipality_name": "Shaarda",
      "district_id": 60
    },
    {
      "municipality_id": 253,
      "municipality_name": "Shadanand",
      "district_id": 1
    },
    {
      "municipality_id": 254,
      "municipality_name": "Shahidnagar",
      "district_id": 17
    },
    {
      "municipality_id": 255,
      "municipality_name": "Shailyashikhar",
      "district_id": 77
    },
    {
      "municipality_id": 256,
      "municipality_name": "Shambhunath",
      "district_id": 15
    },
    {
      "municipality_id": 257,
      "municipality_name": "Shankharapur",
      "district_id": 28
    },
    {
      "municipality_id": 258,
      "municipality_name": "Shikhar",
      "district_id": 71
    },
    {
      "municipality_id": 259,
      "municipality_name": "Shiva Sataxi",
      "district_id": 4
    },
    {
      "municipality_id": 260,
      "municipality_name": "Shivaraj",
      "district_id": 47
    },
    {
      "municipality_id": 261,
      "municipality_name": "Shuklagandaki",
      "district_id": 46
    },
    {
      "municipality_id": 262,
      "municipality_name": "Shuklaphanta",
      "district_id": 74
    },
    {
      "municipality_id": 263,
      "municipality_name": "Siddharthanagar",
      "district_id": 49
    },
    {
      "municipality_id": 264,
      "municipality_name": "Siddhicharan",
      "district_id": 7
    },
    {
      "municipality_id": 265,
      "municipality_name": "Simraungadh",
      "district_id": 20
    },
    {
      "municipality_id": 266,
      "municipality_name": "Siraha",
      "district_id": 16
    },
    {
      "municipality_id": 267,
      "municipality_name": "Sitganga",
      "district_id": 50
    },
    {
      "municipality_id": 268,
      "municipality_name": "Solu Dudhkunda",
      "district_id": 10
    },
    {
      "municipality_id": 269,
      "municipality_name": "Sukhipur",
      "district_id": 16
    },
    {
      "municipality_id": 270,
      "municipality_name": "Sunawarshi",
      "district_id": 6
    },
    {
      "municipality_id": 271,
      "municipality_name": "Sundar Haraincha",
      "district_id": 6
    },
    {
      "municipality_id": 272,
      "municipality_name": "Sundarbazar",
      "district_id": 39
    },
    {
      "municipality_id": 273,
      "municipality_name": "Sunwal",
      "district_id": 48
    },
    {
      "municipality_id": 274,
      "municipality_name": "Surunga",
      "district_id": 15
    },
    {
      "municipality_id": 275,
      "municipality_name": "Suryabinayak",
      "district_id": 26
    },
    {
      "municipality_id": 276,
      "municipality_name": "Suryodaya",
      "district_id": 3
    },
    {
      "municipality_id": 277,
      "municipality_name": "Swargadwari",
      "district_id": 54
    },
    {
      "municipality_id": 278,
      "municipality_name": "Tansen",
      "district_id": 52
    },
    {
      "municipality_id": 279,
      "municipality_name": "Tarakeshor",
      "district_id": 28
    },
    {
      "municipality_id": 280,
      "municipality_name": "Thaha",
      "district_id": 35
    },
    {
      "municipality_id": 281,
      "municipality_name": "Thakurbaba",
      "district_id": 58
    },
    {
      "municipality_id": 282,
      "municipality_name": "Thuli Bheri",
      "district_id": 61
    },
    {
      "municipality_id": 283,
      "municipality_name": "Tikapur",
      "district_id": 69
    },
    {
      "municipality_id": 284,
      "municipality_name": "Tilagufa",
      "district_id": 64
    },
    {
      "municipality_id": 285,
      "municipality_name": "Tilottama",
      "district_id": 49
    },
    {
      "municipality_id": 286,
      "municipality_name": "Tokha",
      "district_id": 28
    },
    {
      "municipality_id": 287,
      "municipality_name": "Tribeni",
      "district_id": 73
    },
    {
      "municipality_id": 288,
      "municipality_name": "Tripura Sundari",
      "district_id": 61
    },
    {
      "municipality_id": 289,
      "municipality_name": "Triyuga",
      "district_id": 14
    },
    {
      "municipality_id": 290,
      "municipality_name": "Tulsipur",
      "district_id": 53
    },
    {
      "municipality_id": 291,
      "municipality_name": "Urlabari",
      "district_id": 6
    },
    {
      "municipality_id": 292,
      "municipality_name": "Vyas",
      "district_id": 46
    },
    {
      "municipality_id": 293,
      "municipality_name": "Waling",
      "district_id": 45
    },
    {
      "municipality_id": 294,
      "municipality_name": "Hatuwagadhi",
      "district_id": 1
    },
    {
      "municipality_id": 295,
      "municipality_name": "Ramprasad Rai",
      "district_id": 1
    },
    {
      "municipality_id": 296,
      "municipality_name": "Aamchok",
      "district_id": 1
    },
    {
      "municipality_id": 297,
      "municipality_name": "Tyamke Maiyunm",
      "district_id": 1
    },
    {
      "municipality_id": 298,
      "municipality_name": "Arun",
      "district_id": 1
    },
    {
      "municipality_id": 299,
      "municipality_name": "Pauwadungma",
      "district_id": 1
    },
    {
      "municipality_id": 300,
      "municipality_name": "Salpasilichho",
      "district_id": 1
    },
    {
      "municipality_id": 301,
      "municipality_name": "Sangurigadhi",
      "district_id": 2
    },
    {
      "municipality_id": 302,
      "municipality_name": "Chaubise",
      "district_id": 2
    },
    {
      "municipality_id": 303,
      "municipality_name": "Khalsa Chhintang Sahidbhumi",
      "district_id": 2
    },
    {
      "municipality_id": 304,
      "municipality_name": "Chhathar Jorpati",
      "district_id": 2
    },
    {
      "municipality_id": 305,
      "municipality_name": "Phakphokthum",
      "district_id": 3
    },
    {
      "municipality_id": 306,
      "municipality_name": "Mai Jogmai",
      "district_id": 3
    },
    {
      "municipality_id": 307,
      "municipality_name": "Chulachuli",
      "district_id": 3
    },
    {
      "municipality_id": 308,
      "municipality_name": "Rong",
      "district_id": 3
    },
    {
      "municipality_id": 309,
      "municipality_name": "Mangsebung",
      "district_id": 3
    },
    {
      "municipality_id": 310,
      "municipality_name": "Sandakpur",
      "district_id": 3
    },
    {
      "municipality_id": 311,
      "municipality_name": "Kamal",
      "district_id": 4
    },
    {
      "municipality_id": 312,
      "municipality_name": "Buddha Shanti",
      "district_id": 4
    },
    {
      "municipality_id": 313,
      "municipality_name": "Kachankawal",
      "district_id": 4
    },
    {
      "municipality_id": 314,
      "municipality_name": "Jhapa",
      "district_id": 4
    },
    {
      "municipality_id": 315,
      "municipality_name": "Barhadashi",
      "district_id": 4
    },
    {
      "municipality_id": 316,
      "municipality_name": "Gaurigunj",
      "district_id": 4
    },
    {
      "municipality_id": 317,
      "municipality_name": "Haldibari",
      "district_id": 4
    },
    {
      "municipality_id": 318,
      "municipality_name": "Khotehang",
      "district_id": 5
    },
    {
      "municipality_id": 319,
      "municipality_name": "Diprung",
      "district_id": 5
    },
    {
      "municipality_id": 320,
      "municipality_name": "Aiselukharka",
      "district_id": 5
    },
    {
      "municipality_id": 321,
      "municipality_name": "Jantedhunga",
      "district_id": 5
    },
    {
      "municipality_id": 322,
      "municipality_name": "Kepilasgadhi",
      "district_id": 5
    },
    {
      "municipality_id": 323,
      "municipality_name": "Barahpokhari",
      "district_id": 5
    },
    {
      "municipality_id": 324,
      "municipality_name": "Lamidanda",
      "district_id": 5
    },
    {
      "municipality_id": 325,
      "municipality_name": "Sakela",
      "district_id": 5
    },
    {
      "municipality_id": 326,
      "municipality_name": "Jahada",
      "district_id": 6
    },
    {
      "municipality_id": 327,
      "municipality_name": "Budi Ganga",
      "district_id": 6
    },
    {
      "municipality_id": 328,
      "municipality_name": "Katahari",
      "district_id": 6
    },
    {
      "municipality_id": 329,
      "municipality_name": "Dhanpalthan",
      "district_id": 6
    },
    {
      "municipality_id": 330,
      "municipality_name": "Kanepokhari",
      "district_id": 6
    },
    {
      "municipality_id": 331,
      "municipality_name": "Gramthan",
      "district_id": 6
    },
    {
      "municipality_id": 332,
      "municipality_name": "Kerabari",
      "district_id": 6
    },
    {
      "municipality_id": 333,
      "municipality_name": "Miklajung",
      "district_id": 6
    },
    {
      "municipality_id": 334,
      "municipality_name": "Manebhanjyang",
      "district_id": 7
    },
    {
      "municipality_id": 335,
      "municipality_name": "Champadevi",
      "district_id": 7
    },
    {
      "municipality_id": 336,
      "municipality_name": "Sunkoshi",
      "district_id": 7
    },
    {
      "municipality_id": 337,
      "municipality_name": "Molung",
      "district_id": 7
    },
    {
      "municipality_id": 338,
      "municipality_name": "Chisankhugadhi",
      "district_id": 7
    },
    {
      "municipality_id": 339,
      "municipality_name": "Khiji Demba",
      "district_id": 7
    },
    {
      "municipality_id": 340,
      "municipality_name": "Likhu",
      "district_id": 7
    },
    {
      "municipality_id": 341,
      "municipality_name": "Miklajung",
      "district_id": 8
    },
    {
      "municipality_id": 342,
      "municipality_name": "Phalgunanda",
      "district_id": 8
    },
    {
      "municipality_id": 343,
      "municipality_name": "Hilihang",
      "district_id": 8
    },
    {
      "municipality_id": 344,
      "municipality_name": "Phalelung",
      "district_id": 8
    },
    {
      "municipality_id": 345,
      "municipality_name": "Yangwarak",
      "district_id": 8
    },
    {
      "municipality_id": 346,
      "municipality_name": "Kummayak",
      "district_id": 8
    },
    {
      "municipality_id": 347,
      "municipality_name": "Tumbewa",
      "district_id": 8
    },
    {
      "municipality_id": 348,
      "municipality_name": "Makalu",
      "district_id": 9
    },
    {
      "municipality_id": 349,
      "municipality_name": "Silichong",
      "district_id": 9
    },
    {
      "municipality_id": 350,
      "municipality_name": "Sabhapokhari",
      "district_id": 9
    },
    {
      "municipality_id": 351,
      "municipality_name": "Chichila",
      "district_id": 9
    },
    {
      "municipality_id": 352,
      "municipality_name": "Bhot Khola",
      "district_id": 9
    },
    {
      "municipality_id": 353,
      "municipality_name": "Dudhakaushika",
      "district_id": 10
    },
    {
      "municipality_id": 354,
      "municipality_name": "Necha Salyan",
      "district_id": 10
    },
    {
      "municipality_id": 355,
      "municipality_name": "Dudhkoshi",
      "district_id": 10
    },
    {
      "municipality_id": 356,
      "municipality_name": "Maha Kulung",
      "district_id": 10
    },
    {
      "municipality_id": 357,
      "municipality_name": "Sotang",
      "district_id": 10
    },
    {
      "municipality_id": 358,
      "municipality_name": "Khumbu Pasang Lhamu",
      "district_id": 10
    },
    {
      "municipality_id": 359,
      "municipality_name": "Likhu Pike",
      "district_id": 10
    },
    {
      "municipality_id": 360,
      "municipality_name": "Koshi",
      "district_id": 11
    },
    {
      "municipality_id": 361,
      "municipality_name": "Harinagara",
      "district_id": 11
    },
    {
      "municipality_id": 362,
      "municipality_name": "Bhokraha",
      "district_id": 11
    },
    {
      "municipality_id": 363,
      "municipality_name": "Dewangunj",
      "district_id": 11
    },
    {
      "municipality_id": 364,
      "municipality_name": "Gadhi",
      "district_id": 11
    },
    {
      "municipality_id": 365,
      "municipality_name": "Barju",
      "district_id": 11
    },
    {
      "municipality_id": 366,
      "municipality_name": "Sirijangha",
      "district_id": 12
    },
    {
      "municipality_id": 367,
      "municipality_name": "Aathrai Triveni",
      "district_id": 12
    },
    {
      "municipality_id": 368,
      "municipality_name": "Pathibhara Yangwarak",
      "district_id": 12
    },
    {
      "municipality_id": 369,
      "municipality_name": "Meringden",
      "district_id": 12
    },
    {
      "municipality_id": 370,
      "municipality_name": "Sidingwa",
      "district_id": 12
    },
    {
      "municipality_id": 371,
      "municipality_name": "Phaktanglung",
      "district_id": 12
    },
    {
      "municipality_id": 372,
      "municipality_name": "Maiwa Khola",
      "district_id": 12
    },
    {
      "municipality_id": 373,
      "municipality_name": "Mikwa Khola",
      "district_id": 12
    },
    {
      "municipality_id": 374,
      "municipality_name": "Aathrai",
      "district_id": 13
    },
    {
      "municipality_id": 375,
      "municipality_name": "Phedap",
      "district_id": 13
    },
    {
      "municipality_id": 376,
      "municipality_name": "Chhathar",
      "district_id": 13
    },
    {
      "municipality_id": 377,
      "municipality_name": "Menchayayem",
      "district_id": 13
    },
    {
      "municipality_id": 378,
      "municipality_name": "Udayapurgadhi",
      "district_id": 14
    },
    {
      "municipality_id": 379,
      "municipality_name": "Rautamai",
      "district_id": 14
    },
    {
      "municipality_id": 380,
      "municipality_name": "Tapli",
      "district_id": 14
    },
    {
      "municipality_id": 381,
      "municipality_name": "Limchungbung",
      "district_id": 14
    },
    {
      "municipality_id": 382,
      "municipality_name": "Subarna",
      "district_id": 20
    },
    {
      "municipality_id": 383,
      "municipality_name": "Adarsha Kotwal",
      "district_id": 20
    },
    {
      "municipality_id": 384,
      "municipality_name": "Baragadhi",
      "district_id": 20
    },
    {
      "municipality_id": 385,
      "municipality_name": "Pheta",
      "district_id": 20
    },
    {
      "municipality_id": 386,
      "municipality_name": "Karaiyamai",
      "district_id": 20
    },
    {
      "municipality_id": 387,
      "municipality_name": "Prasauni",
      "district_id": 20
    },
    {
      "municipality_id": 388,
      "municipality_name": "Bishrampur",
      "district_id": 20
    },
    {
      "municipality_id": 389,
      "municipality_name": "Devtal",
      "district_id": 20
    },
    {
      "municipality_id": 390,
      "municipality_name": "Parawanipur",
      "district_id": 20
    },
    {
      "municipality_id": 391,
      "municipality_name": "Laksminiya",
      "district_id": 17
    },
    {
      "municipality_id": 392,
      "municipality_name": "Mukhiyapatti Musaharmiya",
      "district_id": 17
    },
    {
      "municipality_id": 393,
      "municipality_name": "Janak Nandini",
      "district_id": 17
    },
    {
      "municipality_id": 394,
      "municipality_name": "Aaurahi",
      "district_id": 17
    },
    {
      "municipality_id": 395,
      "municipality_name": "Bateshwar",
      "district_id": 17
    },
    {
      "municipality_id": 396,
      "municipality_name": "Dhanauji",
      "district_id": 17
    },
    {
      "municipality_id": 397,
      "municipality_name": "Sonama",
      "district_id": 18
    },
    {
      "municipality_id": 398,
      "municipality_name": "Pipara",
      "district_id": 18
    },
    {
      "municipality_id": 399,
      "municipality_name": "Samsi",
      "district_id": 18
    },
    {
      "municipality_id": 400,
      "municipality_name": "Ekdara",
      "district_id": 18
    },
    {
      "municipality_id": 401,
      "municipality_name": "Mahottari Rural Municipality",
      "district_id": 18
    },
    {
      "municipality_id": 402,
      "municipality_name": "Sakhuwa Prasauni",
      "district_id": 21
    },
    {
      "municipality_id": 403,
      "municipality_name": "Jagarnathpur",
      "district_id": 21
    },
    {
      "municipality_id": 404,
      "municipality_name": "Chhipaharmai",
      "district_id": 21
    },
    {
      "municipality_id": 405,
      "municipality_name": "Bindabasini",
      "district_id": 21
    },
    {
      "municipality_id": 406,
      "municipality_name": "Paterwa Sugauli",
      "district_id": 21
    },
    {
      "municipality_id": 407,
      "municipality_name": "Jeera Bhavani",
      "district_id": 21
    },
    {
      "municipality_id": 408,
      "municipality_name": "Kalikamai",
      "district_id": 21
    },
    {
      "municipality_id": 409,
      "municipality_name": "Pakaha Mainpur",
      "district_id": 21
    },
    {
      "municipality_id": 410,
      "municipality_name": "Thori",
      "district_id": 21
    },
    {
      "municipality_id": 411,
      "municipality_name": "Dhobini",
      "district_id": 21
    },
    {
      "municipality_id": 412,
      "municipality_name": "Durga Bhagawati",
      "district_id": 22
    },
    {
      "municipality_id": 413,
      "municipality_name": "Yamunamai",
      "district_id": 22
    },
    {
      "municipality_id": 414,
      "municipality_name": "Tilathi Koiladi",
      "district_id": 15
    },
    {
      "municipality_id": 415,
      "municipality_name": "Belhi Chapena",
      "district_id": 15
    },
    {
      "municipality_id": 416,
      "municipality_name": "Chhinnamasta",
      "district_id": 15
    },
    {
      "municipality_id": 417,
      "municipality_name": "Mahadeva",
      "district_id": 15
    },
    {
      "municipality_id": 418,
      "municipality_name": "Aagnisaira Krishnasawaran",
      "district_id": 15
    },
    {
      "municipality_id": 419,
      "municipality_name": "Rupani",
      "district_id": 15
    },
    {
      "municipality_id": 420,
      "municipality_name": "Balan-Bihul",
      "district_id": 15
    },
    {
      "municipality_id": 421,
      "municipality_name": "Bishnupur",
      "district_id": 15
    },
    {
      "municipality_id": 422,
      "municipality_name": "Tirhut",
      "district_id": 15
    },
    {
      "municipality_id": 423,
      "municipality_name": "Chandranagar",
      "district_id": 19
    },
    {
      "municipality_id": 424,
      "municipality_name": "Bramhapuri",
      "district_id": 19
    },
    {
      "municipality_id": 425,
      "municipality_name": "Ramnagar",
      "district_id": 19
    },
    {
      "municipality_id": 426,
      "municipality_name": "Chakraghatta",
      "district_id": 19
    },
    {
      "municipality_id": 427,
      "municipality_name": "Kaudena",
      "district_id": 19
    },
    {
      "municipality_id": 428,
      "municipality_name": "Dhankaul",
      "district_id": 19
    },
    {
      "municipality_id": 429,
      "municipality_name": "Bishnu",
      "district_id": 19
    },
    {
      "municipality_id": 430,
      "municipality_name": "Basbariya",
      "district_id": 19
    },
    {
      "municipality_id": 431,
      "municipality_name": "Parsa",
      "district_id": 19
    },
    {
      "municipality_id": 432,
      "municipality_name": "Laksmipur Patari",
      "district_id": 16
    },
    {
      "municipality_id": 433,
      "municipality_name": "Bariyarpatti",
      "district_id": 16
    },
    {
      "municipality_id": 434,
      "municipality_name": "Aaurahi",
      "district_id": 16
    },
    {
      "municipality_id": 435,
      "municipality_name": "Arnama",
      "district_id": 16
    },
    {
      "municipality_id": 436,
      "municipality_name": "Bhagawanpur",
      "district_id": 16
    },
    {
      "municipality_id": 437,
      "municipality_name": "Naraha",
      "district_id": 16
    },
    {
      "municipality_id": 438,
      "municipality_name": "Nawarajpur",
      "district_id": 16
    },
    {
      "municipality_id": 439,
      "municipality_name": "Sakhuwanankarkatti",
      "district_id": 16
    },
    {
      "municipality_id": 440,
      "municipality_name": "Bishnupur",
      "district_id": 16
    },
    {
      "municipality_id": 441,
      "municipality_name": "Ichchhakamana",
      "district_id": 34
    },
    {
      "municipality_id": 442,
      "municipality_name": "Thakre",
      "district_id": 27
    },
    {
      "municipality_id": 443,
      "municipality_name": "Benighat Rorang",
      "district_id": 27
    },
    {
      "municipality_id": 444,
      "municipality_name": "Galchhi",
      "district_id": 27
    },
    {
      "municipality_id": 445,
      "municipality_name": "Gajuri",
      "district_id": 27
    },
    {
      "municipality_id": 446,
      "municipality_name": "Jwalamukhi",
      "district_id": 27
    },
    {
      "municipality_id": 447,
      "municipality_name": "Siddhalekh",
      "district_id": 27
    },
    {
      "municipality_id": 448,
      "municipality_name": "Tripura Sundari",
      "district_id": 27
    },
    {
      "municipality_id": 449,
      "municipality_name": "Gangajamuna",
      "district_id": 27
    },
    {
      "municipality_id": 450,
      "municipality_name": "Netrawati Dabjong",
      "district_id": 27
    },
    {
      "municipality_id": 451,
      "municipality_name": "Khaniyabas",
      "district_id": 27
    },
    {
      "municipality_id": 452,
      "municipality_name": "Ruby Valley",
      "district_id": 27
    },
    {
      "municipality_id": 453,
      "municipality_name": "Kalinchok",
      "district_id": 25
    },
    {
      "municipality_id": 454,
      "municipality_name": "Melung",
      "district_id": 25
    },
    {
      "municipality_id": 455,
      "municipality_name": "Shailung",
      "district_id": 25
    },
    {
      "municipality_id": 456,
      "municipality_name": "Baiteshwar",
      "district_id": 25
    },
    {
      "municipality_id": 457,
      "municipality_name": "Tamakoshi",
      "district_id": 25
    },
    {
      "municipality_id": 458,
      "municipality_name": "Bigu",
      "district_id": 25
    },
    {
      "municipality_id": 459,
      "municipality_name": "Gaurishankar",
      "district_id": 25
    },
    {
      "municipality_id": 460,
      "municipality_name": "Roshi",
      "district_id": 29
    },
    {
      "municipality_id": 461,
      "municipality_name": "Temal",
      "district_id": 29
    },
    {
      "municipality_id": 462,
      "municipality_name": "Chaunri Deurali",
      "district_id": 29
    },
    {
      "municipality_id": 463,
      "municipality_name": "Bhumlu",
      "district_id": 29
    },
    {
      "municipality_id": 464,
      "municipality_name": "Mahabharat",
      "district_id": 29
    },
    {
      "municipality_id": 465,
      "municipality_name": "Bethanchok",
      "district_id": 29
    },
    {
      "municipality_id": 466,
      "municipality_name": "Khanikhola",
      "district_id": 29
    },
    {
      "municipality_id": 467,
      "municipality_name": "Bagmati",
      "district_id": 30
    },
    {
      "municipality_id": 468,
      "municipality_name": "Konjyosom",
      "district_id": 30
    },
    {
      "municipality_id": 469,
      "municipality_name": "Mahankal",
      "district_id": 30
    },
    {
      "municipality_id": 470,
      "municipality_name": "Bakaiya",
      "district_id": 35
    },
    {
      "municipality_id": 471,
      "municipality_name": "Manhari",
      "district_id": 35
    },
    {
      "municipality_id": 472,
      "municipality_name": "Bagmati",
      "district_id": 35
    },
    {
      "municipality_id": 473,
      "municipality_name": "Raksirang",
      "district_id": 35
    },
    {
      "municipality_id": 474,
      "municipality_name": "Makawanpurgadhi",
      "district_id": 35
    },
    {
      "municipality_id": 475,
      "municipality_name": "Kailash",
      "district_id": 35
    },
    {
      "municipality_id": 476,
      "municipality_name": "Bhimphedi",
      "district_id": 35
    },
    {
      "municipality_id": 477,
      "municipality_name": "Indrasarowar",
      "district_id": 35
    },
    {
      "municipality_id": 478,
      "municipality_name": "Kakani",
      "district_id": 31
    },
    {
      "municipality_id": 479,
      "municipality_name": "Dupcheshwar",
      "district_id": 31
    },
    {
      "municipality_id": 480,
      "municipality_name": "Shivapuri",
      "district_id": 31
    },
    {
      "municipality_id": 481,
      "municipality_name": "Tadi",
      "district_id": 31
    },
    {
      "municipality_id": 482,
      "municipality_name": "Likhu",
      "district_id": 31
    },
    {
      "municipality_id": 483,
      "municipality_name": "Suryagadhi",
      "district_id": 31
    },
    {
      "municipality_id": 484,
      "municipality_name": "Panchakanya",
      "district_id": 31
    },
    {
      "municipality_id": 485,
      "municipality_name": "Tarkeshwar",
      "district_id": 31
    },
    {
      "municipality_id": 486,
      "municipality_name": "Kispang",
      "district_id": 31
    },
    {
      "municipality_id": 487,
      "municipality_name": "Myagang",
      "district_id": 31
    },
    {
      "municipality_id": 488,
      "municipality_name": "Khandadevi",
      "district_id": 24
    },
    {
      "municipality_id": 489,
      "municipality_name": "Likhu Tamakoshi",
      "district_id": 24
    },
    {
      "municipality_id": 490,
      "municipality_name": "Doramba",
      "district_id": 24
    },
    {
      "municipality_id": 491,
      "municipality_name": "Gokulganga",
      "district_id": 24
    },
    {
      "municipality_id": 492,
      "municipality_name": "Sunapati",
      "district_id": 24
    },
    {
      "municipality_id": 493,
      "municipality_name": "Umakunda",
      "district_id": 24
    },
    {
      "municipality_id": 494,
      "municipality_name": "Naukunda",
      "district_id": 32
    },
    {
      "municipality_id": 495,
      "municipality_name": "Kalika",
      "district_id": 32
    },
    {
      "municipality_id": 496,
      "municipality_name": "Uttargaya",
      "district_id": 32
    },
    {
      "municipality_id": 497,
      "municipality_name": "Gosaikund",
      "district_id": 32
    },
    {
      "municipality_id": 498,
      "municipality_name": "Aamachodingmo",
      "district_id": 32
    },
    {
      "municipality_id": 499,
      "municipality_name": "Tinpatan",
      "district_id": 23
    },
    {
      "municipality_id": 500,
      "municipality_name": "Marin",
      "district_id": 23
    },
    {
      "municipality_id": 501,
      "municipality_name": "Hariharpurgadhi",
      "district_id": 23
    },
    {
      "municipality_id": 502,
      "municipality_name": "Sunkoshi",
      "district_id": 23
    },
    {
      "municipality_id": 503,
      "municipality_name": "Golanjor",
      "district_id": 23
    },
    {
      "municipality_id": 504,
      "municipality_name": "Phikkal",
      "district_id": 23
    },
    {
      "municipality_id": 505,
      "municipality_name": "Ghyanglekh",
      "district_id": 23
    },
    {
      "municipality_id": 506,
      "municipality_name": "Indrawati",
      "district_id": 33
    },
    {
      "municipality_id": 507,
      "municipality_name": "Panchpokhari Thangpal",
      "district_id": 33
    },
    {
      "municipality_id": 508,
      "municipality_name": "Jugal",
      "district_id": 33
    },
    {
      "municipality_id": 509,
      "municipality_name": "Balephi",
      "district_id": 33
    },
    {
      "municipality_id": 510,
      "municipality_name": "Helambu",
      "district_id": 33
    },
    {
      "municipality_id": 511,
      "municipality_name": "Bhotekoshi",
      "district_id": 33
    },
    {
      "municipality_id": 512,
      "municipality_name": "Sunkoshi",
      "district_id": 33
    },
    {
      "municipality_id": 513,
      "municipality_name": "Lisankhu Pakhar",
      "district_id": 33
    },
    {
      "municipality_id": 514,
      "municipality_name": "Tripura Sundari",
      "district_id": 33
    },
    {
      "municipality_id": 515,
      "municipality_name": "Badigad",
      "district_id": 36
    },
    {
      "municipality_id": 516,
      "municipality_name": "Kathekhola",
      "district_id": 36
    },
    {
      "municipality_id": 517,
      "municipality_name": "Nisikhola",
      "district_id": 36
    },
    {
      "municipality_id": 518,
      "municipality_name": "Bareng",
      "district_id": 36
    },
    {
      "municipality_id": 519,
      "municipality_name": "Tarakhola",
      "district_id": 36
    },
    {
      "municipality_id": 520,
      "municipality_name": "Tamankhola",
      "district_id": 36
    },
    {
      "municipality_id": 521,
      "municipality_name": "Shahid Lakhan",
      "district_id": 37
    },
    {
      "municipality_id": 522,
      "municipality_name": "Barpak Sulikot",
      "district_id": 37
    },
    {
      "municipality_id": 523,
      "municipality_name": "Aarughat",
      "district_id": 37
    },
    {
      "municipality_id": 524,
      "municipality_name": "Siranchok",
      "district_id": 37
    },
    {
      "municipality_id": 525,
      "municipality_name": "Gandaki",
      "district_id": 37
    },
    {
      "municipality_id": 526,
      "municipality_name": "Bhimsen Thapa",
      "district_id": 37
    },
    {
      "municipality_id": 527,
      "municipality_name": "Ajirkot",
      "district_id": 37
    },
    {
      "municipality_id": 528,
      "municipality_name": "Dharche",
      "district_id": 37
    },
    {
      "municipality_id": 529,
      "municipality_name": "Chum Nubri",
      "district_id": 37
    },
    {
      "municipality_id": 530,
      "municipality_name": "Annapurna",
      "district_id": 38
    },
    {
      "municipality_id": 531,
      "municipality_name": "Machhapuchhre",
      "district_id": 38
    },
    {
      "municipality_id": 532,
      "municipality_name": "Madi",
      "district_id": 38
    },
    {
      "municipality_id": 533,
      "municipality_name": "Rupa",
      "district_id": 38
    },
    {
      "municipality_id": 534,
      "municipality_name": "Marsyangdi",
      "district_id": 39
    },
    {
      "municipality_id": 535,
      "municipality_name": "Dordi",
      "district_id": 39
    },
    {
      "municipality_id": 536,
      "municipality_name": "Dudhpokhari",
      "district_id": 39
    },
    {
      "municipality_id": 537,
      "municipality_name": "Kwaholasothar",
      "district_id": 39
    },
    {
      "municipality_id": 538,
      "municipality_name": "Manang Disyang",
      "district_id": 40
    },
    {
      "municipality_id": 539,
      "municipality_name": "Nason",
      "district_id": 40
    },
    {
      "municipality_id": 540,
      "municipality_name": "Chame",
      "district_id": 40
    },
    {
      "municipality_id": 541,
      "municipality_name": "Narpa Bhumi",
      "district_id": 40
    },
    {
      "municipality_id": 542,
      "municipality_name": "Gharpajhong",
      "district_id": 41
    },
    {
      "municipality_id": 543,
      "municipality_name": "Thasang",
      "district_id": 41
    },
    {
      "municipality_id": 544,
      "municipality_name": "Baragung Muktichhetra",
      "district_id": 41
    },
    {
      "municipality_id": 545,
      "municipality_name": "Lomanthang",
      "district_id": 41
    },
    {
      "municipality_id": 546,
      "municipality_name": "Lo-Thekar Damodarkunda",
      "district_id": 41
    },
    {
      "municipality_id": 547,
      "municipality_name": "Malika",
      "district_id": 42
    },
    {
      "municipality_id": 548,
      "municipality_name": "Mangala",
      "district_id": 42
    },
    {
      "municipality_id": 549,
      "municipality_name": "Raghuganga",
      "district_id": 42
    },
    {
      "municipality_id": 550,
      "municipality_name": "Dhaulagiri",
      "district_id": 42
    },
    {
      "municipality_id": 551,
      "municipality_name": "Annapurna",
      "district_id": 42
    },
    {
      "municipality_id": 552,
      "municipality_name": "Hupsekot",
      "district_id": 43
    },
    {
      "municipality_id": 553,
      "municipality_name": "Binayi Triveni",
      "district_id": 43
    },
    {
      "municipality_id": 554,
      "municipality_name": "Bulingtar",
      "district_id": 43
    },
    {
      "municipality_id": 555,
      "municipality_name": "Baudikali",
      "district_id": 43
    },
    {
      "municipality_id": 556,
      "municipality_name": "Jaljala",
      "district_id": 44
    },
    {
      "municipality_id": 557,
      "municipality_name": "Modi",
      "district_id": 44
    },
    {
      "municipality_id": 558,
      "municipality_name": "Painyu",
      "district_id": 44
    },
    {
      "municipality_id": 559,
      "municipality_name": "Bihadi",
      "district_id": 44
    },
    {
      "municipality_id": 560,
      "municipality_name": "Mahashila",
      "district_id": 44
    },
    {
      "municipality_id": 561,
      "municipality_name": "Kaligandaki",
      "district_id": 45
    },
    {
      "municipality_id": 562,
      "municipality_name": "Biruwa",
      "district_id": 45
    },
    {
      "municipality_id": 563,
      "municipality_name": "Harinas",
      "district_id": 45
    },
    {
      "municipality_id": 564,
      "municipality_name": "Aandhikhola",
      "district_id": 45
    },
    {
      "municipality_id": 565,
      "municipality_name": "Arjun Chaupari",
      "district_id": 45
    },
    {
      "municipality_id": 566,
      "municipality_name": "Phedikhola",
      "district_id": 45
    },
    {
      "municipality_id": 567,
      "municipality_name": "Rishing",
      "district_id": 46
    },
    {
      "municipality_id": 568,
      "municipality_name": "Myagde",
      "district_id": 46
    },
    {
      "municipality_id": 569,
      "municipality_name": "Aanbu Khaireni",
      "district_id": 46
    },
    {
      "municipality_id": 570,
      "municipality_name": "Bandipur",
      "district_id": 46
    },
    {
      "municipality_id": 571,
      "municipality_name": "Ghiring",
      "district_id": 46
    },
    {
      "municipality_id": 572,
      "municipality_name": "Devghat",
      "district_id": 46
    },
    {
      "municipality_id": 573,
      "municipality_name": "Malarani",
      "district_id": 50
    },
    {
      "municipality_id": 574,
      "municipality_name": "Pandini",
      "district_id": 50
    },
    {
      "municipality_id": 575,
      "municipality_name": "Chhatradev",
      "district_id": 50
    },
    {
      "municipality_id": 576,
      "municipality_name": "Raptisonari",
      "district_id": 57
    },
    {
      "municipality_id": 577,
      "municipality_name": "Baijnath",
      "district_id": 57
    },
    {
      "municipality_id": 578,
      "municipality_name": "Khajura",
      "district_id": 57
    },
    {
      "municipality_id": 579,
      "municipality_name": "Janaki",
      "district_id": 57
    },
    {
      "municipality_id": 580,
      "municipality_name": "Duduwa",
      "district_id": 57
    },
    {
      "municipality_id": 581,
      "municipality_name": "Narainapur",
      "district_id": 57
    },
    {
      "municipality_id": 582,
      "municipality_name": "Badhaiyatal",
      "district_id": 58
    },
    {
      "municipality_id": 583,
      "municipality_name": "Geruwa",
      "district_id": 58
    },
    {
      "municipality_id": 584,
      "municipality_name": "Rapti",
      "district_id": 53
    },
    {
      "municipality_id": 585,
      "municipality_name": "Gadhawa",
      "district_id": 53
    },
    {
      "municipality_id": 586,
      "municipality_name": "Babai",
      "district_id": 53
    },
    {
      "municipality_id": 587,
      "municipality_name": "Shantinagar",
      "district_id": 53
    },
    {
      "municipality_id": 588,
      "municipality_name": "Rajpur",
      "district_id": 53
    },
    {
      "municipality_id": 589,
      "municipality_name": "Banglachuli",
      "district_id": 53
    },
    {
      "municipality_id": 590,
      "municipality_name": "Dangisharan",
      "district_id": 53
    },
    {
      "municipality_id": 591,
      "municipality_name": "Satyawati",
      "district_id": 51
    },
    {
      "municipality_id": 592,
      "municipality_name": "Dhurkot",
      "district_id": 51
    },
    {
      "municipality_id": 593,
      "municipality_name": "Gulmi Durbar",
      "district_id": 51
    },
    {
      "municipality_id": 594,
      "municipality_name": "Madane",
      "district_id": 51
    },
    {
      "municipality_id": 595,
      "municipality_name": "Chandrakot",
      "district_id": 51
    },
    {
      "municipality_id": 596,
      "municipality_name": "Malika",
      "district_id": 51
    },
    {
      "municipality_id": 597,
      "municipality_name": "Chhatrakot",
      "district_id": 51
    },
    {
      "municipality_id": 598,
      "municipality_name": "Isma",
      "district_id": 51
    },
    {
      "municipality_id": 599,
      "municipality_name": "Kaligandaki",
      "district_id": 51
    },
    {
      "municipality_id": 600,
      "municipality_name": "Ruru",
      "district_id": 51
    },
    {
      "municipality_id": 601,
      "municipality_name": "Mayadevi",
      "district_id": 47
    },
    {
      "municipality_id": 602,
      "municipality_name": "Shuddhodhan",
      "district_id": 47
    },
    {
      "municipality_id": 603,
      "municipality_name": "Yasodhara",
      "district_id": 47
    },
    {
      "municipality_id": 604,
      "municipality_name": "Bijaynagar",
      "district_id": 47
    },
    {
      "municipality_id": 605,
      "municipality_name": "Triveni Susta",
      "district_id": 48
    },
    {
      "municipality_id": 606,
      "municipality_name": "Pratappur",
      "district_id": 48
    },
    {
      "municipality_id": 607,
      "municipality_name": "Sarawal",
      "district_id": 48
    },
    {
      "municipality_id": 608,
      "municipality_name": "Palhi Nandan",
      "district_id": 48
    },
    {
      "municipality_id": 609,
      "municipality_name": "Rainadevi Chhahara",
      "district_id": 52
    },
    {
      "municipality_id": 610,
      "municipality_name": "Mathagadhi",
      "district_id": 52
    },
    {
      "municipality_id": 611,
      "municipality_name": "Nisdi",
      "district_id": 52
    },
    {
      "municipality_id": 612,
      "municipality_name": "Bagnaskali",
      "district_id": 52
    },
    {
      "municipality_id": 613,
      "municipality_name": "Rambha",
      "district_id": 52
    },
    {
      "municipality_id": 614,
      "municipality_name": "Purbakhola",
      "district_id": 52
    },
    {
      "municipality_id": 615,
      "municipality_name": "Tinau",
      "district_id": 52
    },
    {
      "municipality_id": 616,
      "municipality_name": "Ribdikot",
      "district_id": 52
    },
    {
      "municipality_id": 617,
      "municipality_name": "Naubahini",
      "district_id": 54
    },
    {
      "municipality_id": 618,
      "municipality_name": "Jhimaruk",
      "district_id": 54
    },
    {
      "municipality_id": 619,
      "municipality_name": "Gaumukhi",
      "district_id": 54
    },
    {
      "municipality_id": 620,
      "municipality_name": "Airawati",
      "district_id": 54
    },
    {
      "municipality_id": 621,
      "municipality_name": "Sarumarani",
      "district_id": 54
    },
    {
      "municipality_id": 622,
      "municipality_name": "Mallarani",
      "district_id": 54
    },
    {
      "municipality_id": 623,
      "municipality_name": "Mandavi",
      "district_id": 54
    },
    {
      "municipality_id": 624,
      "municipality_name": "Sunil Smriti",
      "district_id": 55
    },
    {
      "municipality_id": 625,
      "municipality_name": "Runtigadhi",
      "district_id": 55
    },
    {
      "municipality_id": 626,
      "municipality_name": "Lungri",
      "district_id": 55
    },
    {
      "municipality_id": 627,
      "municipality_name": "Triveni",
      "district_id": 55
    },
    {
      "municipality_id": 628,
      "municipality_name": "Paribartan",
      "district_id": 55
    },
    {
      "municipality_id": 629,
      "municipality_name": "Gangadev",
      "district_id": 55
    },
    {
      "municipality_id": 630,
      "municipality_name": "Madi",
      "district_id": 55
    },
    {
      "municipality_id": 631,
      "municipality_name": "Sunchhahari",
      "district_id": 55
    },
    {
      "municipality_id": 632,
      "municipality_name": "Thawang",
      "district_id": 55
    },
    {
      "municipality_id": 633,
      "municipality_name": "Bhume",
      "district_id": 56
    },
    {
      "municipality_id": 634,
      "municipality_name": "Putha Uttarganga",
      "district_id": 56
    },
    {
      "municipality_id": 635,
      "municipality_name": "Sisne",
      "district_id": 56
    },
    {
      "municipality_id": 636,
      "municipality_name": "Gaidhawa",
      "district_id": 49
    },
    {
      "municipality_id": 637,
      "municipality_name": "Mayadevi",
      "district_id": 49
    },
    {
      "municipality_id": 638,
      "municipality_name": "Kotahimai",
      "district_id": 49
    },
    {
      "municipality_id": 639,
      "municipality_name": "Marchawarimai",
      "district_id": 49
    },
    {
      "municipality_id": 640,
      "municipality_name": "Siyari",
      "district_id": 49
    },
    {
      "municipality_id": 641,
      "municipality_name": "Sammarimai",
      "district_id": 49
    },
    {
      "municipality_id": 642,
      "municipality_name": "Rohini",
      "district_id": 49
    },
    {
      "municipality_id": 643,
      "municipality_name": "Shuddhodhan",
      "district_id": 49
    },
    {
      "municipality_id": 644,
      "municipality_name": "Om Satiya",
      "district_id": 49
    },
    {
      "municipality_id": 645,
      "municipality_name": "Kanchan",
      "district_id": 49
    },
    {
      "municipality_id": 646,
      "municipality_name": "Gurans",
      "district_id": 67
    },
    {
      "municipality_id": 647,
      "municipality_name": "Bhairabi",
      "district_id": 67
    },
    {
      "municipality_id": 648,
      "municipality_name": "Naumule",
      "district_id": 67
    },
    {
      "municipality_id": 649,
      "municipality_name": "Mahabu",
      "district_id": 67
    },
    {
      "municipality_id": 650,
      "municipality_name": "Thantikandh",
      "district_id": 67
    },
    {
      "municipality_id": 651,
      "municipality_name": "Bhagawatimai",
      "district_id": 67
    },
    {
      "municipality_id": 652,
      "municipality_name": "Dungeshwar",
      "district_id": 67
    },
    {
      "municipality_id": 653,
      "municipality_name": "Mudkechula",
      "district_id": 61
    },
    {
      "municipality_id": 654,
      "municipality_name": "Kaike",
      "district_id": 61
    },
    {
      "municipality_id": 655,
      "municipality_name": "She Phoksundo",
      "district_id": 61
    },
    {
      "municipality_id": 656,
      "municipality_name": "Jagadulla",
      "district_id": 61
    },
    {
      "municipality_id": 657,
      "municipality_name": "Dolpo Buddha",
      "district_id": 61
    },
    {
      "municipality_id": 658,
      "municipality_name": "Chharka Tangsong",
      "district_id": 61
    },
    {
      "municipality_id": 659,
      "municipality_name": "Simkot",
      "district_id": 62
    },
    {
      "municipality_id": 660,
      "municipality_name": "Sarkegad",
      "district_id": 62
    },
    {
      "municipality_id": 661,
      "municipality_name": "Adanchuli",
      "district_id": 62
    },
    {
      "municipality_id": 662,
      "municipality_name": "Kharpunath",
      "district_id": 62
    },
    {
      "municipality_id": 663,
      "municipality_name": "Tanjakot",
      "district_id": 62
    },
    {
      "municipality_id": 664,
      "municipality_name": "Chankheli",
      "district_id": 62
    },
    {
      "municipality_id": 665,
      "municipality_name": "Namkha",
      "district_id": 62
    },
    {
      "municipality_id": 666,
      "municipality_name": "Junichande",
      "district_id": 68
    },
    {
      "municipality_id": 667,
      "municipality_name": "Kuse",
      "district_id": 68
    },
    {
      "municipality_id": 668,
      "municipality_name": "Barekot",
      "district_id": 68
    },
    {
      "municipality_id": 669,
      "municipality_name": "Shivalaya",
      "district_id": 68
    },
    {
      "municipality_id": 670,
      "municipality_name": "Tatopani",
      "district_id": 63
    },
    {
      "municipality_id": 671,
      "municipality_name": "Patarasi",
      "district_id": 63
    },
    {
      "municipality_id": 672,
      "municipality_name": "Tila",
      "district_id": 63
    },
    {
      "municipality_id": 673,
      "municipality_name": "Kanaka Sundari",
      "district_id": 63
    },
    {
      "municipality_id": 674,
      "municipality_name": "Sinja",
      "district_id": 63
    },
    {
      "municipality_id": 675,
      "municipality_name": "Hima",
      "district_id": 63
    },
    {
      "municipality_id": 676,
      "municipality_name": "Guthichaur",
      "district_id": 63
    },
    {
      "municipality_id": 677,
      "municipality_name": "Narharinath",
      "district_id": 64
    },
    {
      "municipality_id": 678,
      "municipality_name": "Palata",
      "district_id": 64
    },
    {
      "municipality_id": 679,
      "municipality_name": "Shubha Kalika",
      "district_id": 64
    },
    {
      "municipality_id": 680,
      "municipality_name": "Sanni Triveni",
      "district_id": 64
    },
    {
      "municipality_id": 681,
      "municipality_name": "Pachaljharana",
      "district_id": 64
    },
    {
      "municipality_id": 682,
      "municipality_name": "Mahawai",
      "district_id": 64
    },
    {
      "municipality_id": 683,
      "municipality_name": "Khatyad",
      "district_id": 65
    },
    {
      "municipality_id": 684,
      "municipality_name": "Soru",
      "district_id": 65
    },
    {
      "municipality_id": 685,
      "municipality_name": "Mugum Karmarong",
      "district_id": 65
    },
    {
      "municipality_id": 686,
      "municipality_name": "Sani Bheri",
      "district_id": 59
    },
    {
      "municipality_id": 687,
      "municipality_name": "Triveni",
      "district_id": 59
    },
    {
      "municipality_id": 688,
      "municipality_name": "Banphikot",
      "district_id": 59
    },
    {
      "municipality_id": 689,
      "municipality_name": "Kumakh",
      "district_id": 60
    },
    {
      "municipality_id": 690,
      "municipality_name": "Kalimati",
      "district_id": 60
    },
    {
      "municipality_id": 691,
      "municipality_name": "Chhatreshwari",
      "district_id": 60
    },
    {
      "municipality_id": 692,
      "municipality_name": "Darma",
      "district_id": 60
    },
    {
      "municipality_id": 693,
      "municipality_name": "Kapurkot",
      "district_id": 60
    },
    {
      "municipality_id": 694,
      "municipality_name": "Triveni",
      "district_id": 60
    },
    {
      "municipality_id": 695,
      "municipality_name": "Siddha Kumakh",
      "district_id": 60
    },
    {
      "municipality_id": 696,
      "municipality_name": "Barahatal",
      "district_id": 66
    },
    {
      "municipality_id": 697,
      "municipality_name": "Simta",
      "district_id": 66
    },
    {
      "municipality_id": 698,
      "municipality_name": "Chaukune",
      "district_id": 66
    },
    {
      "municipality_id": 699,
      "municipality_name": "Chingad",
      "district_id": 66
    },
    {
      "municipality_id": 700,
      "municipality_name": "Ramaroshan",
      "district_id": 70
    },
    {
      "municipality_id": 701,
      "municipality_name": "Chaurpati",
      "district_id": 70
    },
    {
      "municipality_id": 702,
      "municipality_name": "Turmakhand",
      "district_id": 70
    },
    {
      "municipality_id": 703,
      "municipality_name": "Mellekh",
      "district_id": 70
    },
    {
      "municipality_id": 704,
      "municipality_name": "Dhankari",
      "district_id": 70
    },
    {
      "municipality_id": 705,
      "municipality_name": "Bannigadi Jayagad",
      "district_id": 70
    },
    {
      "municipality_id": 706,
      "municipality_name": "Dogdakedar",
      "district_id": 76
    },
    {
      "municipality_id": 707,
      "municipality_name": "Dilashaini",
      "district_id": 76
    },
    {
      "municipality_id": 708,
      "municipality_name": "Sigas",
      "district_id": 76
    },
    {
      "municipality_id": 709,
      "municipality_name": "Pancheshwar",
      "district_id": 76
    },
    {
      "municipality_id": 710,
      "municipality_name": "Surnaya",
      "district_id": 76
    },
    {
      "municipality_id": 711,
      "municipality_name": "Shivanath",
      "district_id": 76
    },
    {
      "municipality_id": 712,
      "municipality_name": "Kedarsyu",
      "district_id": 72
    },
    {
      "municipality_id": 713,
      "municipality_name": "Thalara",
      "district_id": 72
    },
    {
      "municipality_id": 714,
      "municipality_name": "Bitthadchir",
      "district_id": 72
    },
    {
      "municipality_id": 715,
      "municipality_name": "Chhabis Pathibhera",
      "district_id": 72
    },
    {
      "municipality_id": 716,
      "municipality_name": "Chhanna",
      "district_id": 72
    },
    {
      "municipality_id": 717,
      "municipality_name": "Masta",
      "district_id": 72
    },
    {
      "municipality_id": 718,
      "municipality_name": "Durgathali",
      "district_id": 72
    },
    {
      "municipality_id": 719,
      "municipality_name": "Talkot",
      "district_id": 72
    },
    {
      "municipality_id": 720,
      "municipality_name": "Surma",
      "district_id": 72
    },
    {
      "municipality_id": 721,
      "municipality_name": "Saipal",
      "district_id": 72
    },
    {
      "municipality_id": 722,
      "municipality_name": "Khaptad Chhededaha",
      "district_id": 73
    },
    {
      "municipality_id": 723,
      "municipality_name": "Swami Kartik Khapar",
      "district_id": 73
    },
    {
      "municipality_id": 724,
      "municipality_name": "Jagannath",
      "district_id": 73
    },
    {
      "municipality_id": 725,
      "municipality_name": "Himali",
      "district_id": 73
    },
    {
      "municipality_id": 726,
      "municipality_name": "Gaumul",
      "district_id": 73
    },
    {
      "municipality_id": 727,
      "municipality_name": "Navadurga",
      "district_id": 75
    },
    {
      "municipality_id": 728,
      "municipality_name": "Aalitaal",
      "district_id": 75
    },
    {
      "municipality_id": 729,
      "municipality_name": "Ganyapadhura",
      "district_id": 75
    },
    {
      "municipality_id": 730,
      "municipality_name": "Bhageshwar",
      "district_id": 75
    },
    {
      "municipality_id": 731,
      "municipality_name": "Ajaymeru",
      "district_id": 75
    },
    {
      "municipality_id": 732,
      "municipality_name": "Naugad",
      "district_id": 77
    },
    {
      "municipality_id": 733,
      "municipality_name": "Malikarjun",
      "district_id": 77
    },
    {
      "municipality_id": 734,
      "municipality_name": "Marma",
      "district_id": 77
    },
    {
      "municipality_id": 735,
      "municipality_name": "Lekam",
      "district_id": 77
    },
    {
      "municipality_id": 736,
      "municipality_name": "Duhu",
      "district_id": 77
    },
    {
      "municipality_id": 737,
      "municipality_name": "Vyans",
      "district_id": 77
    },
    {
      "municipality_id": 738,
      "municipality_name": "Api Himal",
      "district_id": 77
    },
    {
      "municipality_id": 739,
      "municipality_name": "Aadarsha",
      "district_id": 71
    },
    {
      "municipality_id": 740,
      "municipality_name": "Purbichauki",
      "district_id": 71
    },
    {
      "municipality_id": 741,
      "municipality_name": "K.I. Singh",
      "district_id": 71
    },
    {
      "municipality_id": 742,
      "municipality_name": "Jorayal",
      "district_id": 71
    },
    {
      "municipality_id": 743,
      "municipality_name": "Sayal",
      "district_id": 71
    },
    {
      "municipality_id": 744,
      "municipality_name": "Bogatan",
      "district_id": 71
    },
    {
      "municipality_id": 745,
      "municipality_name": "Badikedar",
      "district_id": 71
    },
    {
      "municipality_id": 746,
      "municipality_name": "Janaki",
      "district_id": 69
    },
    {
      "municipality_id": 747,
      "municipality_name": "Kailari",
      "district_id": 69
    },
    {
      "municipality_id": 748,
      "municipality_name": "Joshipur",
      "district_id": 69
    },
    {
      "municipality_id": 749,
      "municipality_name": "Bargagoriya",
      "district_id": 69
    },
    {
      "municipality_id": 750,
      "municipality_name": "Mohanyal",
      "district_id": 69
    },
    {
      "municipality_id": 751,
      "municipality_name": "Chure",
      "district_id": 69
    },
    {
      "municipality_id": 752,
      "municipality_name": "Laljhadi",
      "district_id": 74
    },
    {
      "municipality_id": 753,
      "municipality_name": "Beldandi",
      "district_id": 74
    }
  ]
}
