/**
 * Deserialize the json api response.
 *
 * Input:
 *
 * {
 *  "data":[
 *     {
 *       "id":"10034",
 *        "type":"travelogues",
 *        "attributes":{
 *           "start_date":"2017-01-01T00:00:00.000Z",
 *           "likes_count":1,
 *           ...
 *        },
 *        "relationships":{
 *           "user":{
 *              "data":{
 *                 "id":"10011",
 *                 "type":"users"
 *              }
 *           }
 *        }
 *     }
 *  ],
 *  "included":[
 *     {
 *        "id":"10011",
 *        "type":"users",
 *        "attributes":{
 *           "name":"Abhinav Mishra"
 *        }
 *     }]
 *  }
 *}
 *
 *  Output:
 *
 *  {
 *   "start_date":"2017-01-01T00:00:00.000Z",
 *   "likes_count":1,
 *   ...,
 *   "user": {
 *     "id":"10011",
 *     "type":"users"
 *     "name":"Abhinav Mishra"
 *   }
 *}
 *
 *
 * @param {Object} [response] - response from the API
 *
 * @return {Object} - API response with flattened objects
 * */
export function deserialize(response) {
  if(!response) {return null;}

  let {data} = response;

  if (!data) { return response; } // return the same response if it has no `data`

  // return the flattened record for singular data
  if (!Array.isArray(data)) {
    return {
      ...response,
      data: flatten(data, response)
    };
  }

  // return the empty array in case the data is empty array
  if (Array.isArray(data) && !data.length) {
    return {
      ...response,
      data: []
    };
  }

  // return an array of flattened records for arrays
  return {
    ...response,
    data: data.map((record) => {
      return flatten(record, response);
    })
  };
}

/**
 * Merge the attributes and relationships of a record into a plain simple object
 *
 * @param {Object} [record] - Record whose attributes and relationships are to be merged
 * @param {Object} [response] - Object containing all the records
 *
 * @return {Object} - Flattened object containing attributes and relationships of record
 * */
function flatten(record, response) {
  let {relationships} = record;
  let {included} = response;

  let recordAttributes = flattenObject(record);

  if (!included) {
    let {attributes, relationships, ...other} = record;

    if(!relationships) { relationships = {}; }
    
    return {...attributes, ...relationships, ...other};
  }

  Object.keys(relationships || {}).map((relationshipKey) => {
    let relatedRecord = relationships[relationshipKey].data;

    if (Array.isArray(relatedRecord)) {
      recordAttributes[relationshipKey] = [];

      relatedRecord.forEach((singleResource) => {
        included.map((includedRecord) => {
          if (
            includedRecord.type === singleResource.type && // match the record type
            includedRecord.id === singleResource.id        // match the record id
          ) {
            recordAttributes[relationshipKey].push(flattenObject(includedRecord)); // merge `includedRecord` into `recordAttributes`
          }
        });
      });

      return;
    }

    included.map((includedRecord) => {
      if (
        includedRecord.type === relatedRecord.type && // match the record type
        includedRecord.id === relatedRecord.id        // match the record id
      ) {
        recordAttributes[relationshipKey] = flattenObject(includedRecord); // merge `includedRecord` into `recordAttributes`
      }
    });
  });

  return recordAttributes;
}

/**
 * Maps the attributes and other record properties at a single level
 *
 * @param {Object} [record] - Record whose attributes are to be mapped
 *
 * @return {Object} - Flattened object containing attributes at root level
 * */
function flattenObject(record) {
  let {attributes, relationships, ...other} = record; // remove the `relationships` as they will be merged under named key

  return {...attributes, ...other};
}