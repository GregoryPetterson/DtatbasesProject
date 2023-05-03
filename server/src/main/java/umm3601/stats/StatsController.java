package umm3601.stats;

import java.util.Map;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.bson.UuidRepresentation;
import org.mongojack.JacksonMongoCollection;

import io.javalin.http.Context;
import io.javalin.http.HttpStatus;


public class StatsController {

  private final JacksonMongoCollection<Document> statsCollection;

  /**
   * Construct a controller for stats
   *
   * @param database the database containing world stat data
   */
  public StatsController(MongoDatabase database) {
    statsCollection = JacksonMongoCollection.builder().build(
        database,
        "forms",
        Document.class,
        UuidRepresentation.STANDARD);
  }

  /**
   * Set the JSON body of the response to be a list of all the stats returned from the database
   * that match any requested filters and ordering
   *
   * @param ctx a Javalin HTTP context
   */
  public void getCombinedStats(Context ctx) {

    // All three of the find, sort, and into steps happen "in parallel" inside the
    // database system. So MongoDB is going to find the stats with the specified
    // properties, return those sorted in the specified manner, and put the
    // results into an initially empty ArrayList.
    FindIterable<Document> allStats = statsCollection.find();

    // Set the JSON body of the response to be the list of stats returned by the database.
    // According to the Javalin documentation (https://javalin.io/documentation#context),
    // this calls result(jsonString), and also sets content type to json
    ctx.json(allStats);

    // Explicitly set the context status to OK
    ctx.status(HttpStatus.OK);
  }



  /**
   * Add a new stat using information from the context
   * (as long as the information gives "legal" values to stat fields)
   *
   * @param ctx a Javalin HTTP context
   */
  public void addStats(Context ctx) {


    Document statsDocument = Document.parse(ctx.body().toString());
    System.out.println(statsDocument);

    statsCollection.insertOne(statsDocument);

    ctx.json(Map.of("id", statsDocument.getObjectId("_id")));
    // 201 is the HTTP code for when we successfully
    // create a new resource (a request in this case).
    // See, e.g., https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
    // for a description of the various response codes.
    ctx.status(HttpStatus.CREATED);
  }


}
