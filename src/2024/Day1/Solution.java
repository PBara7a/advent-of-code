package Day1;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.IntStream;

public class Solution {

	public static void main(String[] args) throws IOException {
		List<String> lines = Files.readAllLines( Paths.get("src/2024/Day1/input.txt") );

		Map<String, List<Integer>> groupLists = createGroupLists( lines );

		System.out.printf( "Part A: %d%n", calculateListDelta( groupLists.get( "listA" ), groupLists.get( "listB" ) ) );
		System.out.printf( "Part B: %d%n", calculateSimilarityScore( groupLists.get( "listA" ), groupLists.get( "listB" ) ) );
	}

	private static Map<String, List<Integer>> createGroupLists( List<String> lines ) {
		Map<String, List<Integer>> groupLists = new HashMap<>();
		groupLists.put( "listA", new ArrayList<>() );
		groupLists.put( "listB", new ArrayList<>() );

		lines.stream()
				.map( line -> line.split( "\\s+" ) )
				.forEach( values -> {
					groupLists.get( "listA" ).add( Integer.parseInt(values[0]) );
					groupLists.get( "listB" ).add( Integer.parseInt(values[1]) );
				} );

		groupLists.get( "listA" ).sort( Integer::compareTo );
		groupLists.get( "listB" ).sort( Integer::compareTo );

		return groupLists;
	}

	private static int calculateListDelta( List<Integer> listA, List<Integer> listB ) {
		return IntStream.range( 0, listA.size() )
				.map( i -> Math.abs( listA.get( i ) - listB.get( i ) ) )
				.sum();
	}

	private static int countIdOcurrences( int id, List<Integer> idsList ) {
		return (int) idsList.stream()
				.filter( curId -> curId == id )
				.count();
	}

	private static int calculateSimilarityScore( List<Integer> listA, List<Integer> listB ) {
		return listA.stream()
				.mapToInt( id -> id * countIdOcurrences( id, listB ) )
				.sum();
	}

}
