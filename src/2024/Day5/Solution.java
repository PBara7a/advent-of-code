package Day5;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

public class Solution {

	public static void main(String[] args) throws IOException {
		List<String> lines = Files.readAllLines( Paths.get("src/2024/Day5/input.txt") );

		List<List<Integer>> rulesNumbers = extractNumbers( lines, "|" );
		Map<Integer, Set<Integer>> rules = createRulesMap( rulesNumbers );

		List<List<Integer>> updates = extractNumbers( lines, "," );
		List<List<Integer>> validUpdates = filterUpdates( updates, rules, true );
		List<List<Integer>> invalidUpdates = filterUpdates( updates, rules, false );

		System.out.printf( "Part A: %d%n",  sumMiddlePages( validUpdates ) );
		System.out.printf( "Part B: %d%n",  sumMiddlePages( orderUpdates( invalidUpdates, rules ) ) );
	}

	private static List<List<Integer>> extractNumbers( List<String> lines, String separator ) {
		return lines.stream()
				.filter( line -> line.contains( separator ) )
				.map( line -> Arrays.stream( line.split( "\\" + separator ) )
						.map( Integer::parseInt )
						.toList() )
				.toList();
	}

	private static Map<Integer, Set<Integer>> createRulesMap( List<List<Integer>> rulesNumbers ) {
		// Each key is a page number - each value is a set of pages that should come before
		Map<Integer, Set<Integer>> rulesMap = new HashMap<>();
		for ( List<Integer> rulePair : rulesNumbers ) {
			if ( !rulesMap.containsKey( rulePair.get( 1 ) ) ) {
				rulesMap.put( rulePair.get( 1 ), new HashSet<>() {{ add( rulePair.getFirst() ); }} );
			} else {
				rulesMap.get( rulePair.get( 1 ) ).add( rulePair.getFirst() );
			}
		}
		return rulesMap;
	}

	private static boolean isValidUpdate( List<Integer> update, Map<Integer, Set<Integer>> rules ) {
		for ( int i = 0; i < update.size() - 1; i++ ) {
			int currentPage = update.get( i );
			Set<Integer> beforePages = rules.get( currentPage );

			for ( int j = i + 1; j < update.size(); j++ ) {
				if ( beforePages != null && beforePages.contains( update.get( j ) ) ) {
					return false;
				}
			}
		}
		return true;
	}

	private static List<List<Integer>> filterUpdates( List<List<Integer>> updates, Map<Integer, Set<Integer>> rules, boolean areValid ) {
		return updates.stream()
				.filter( update -> areValid == isValidUpdate( update, rules ) )
				.toList();
	}

	private static int sumMiddlePages( List<List<Integer>> updates ) {
		return updates.stream()
				.map( update -> {
					int middleIndex = update.size() / 2;
					return update.get( middleIndex );
				} )
				.reduce( 0, Integer::sum );
	}

	private static List<List<Integer>> orderUpdates( List<List<Integer>> updates, Map<Integer, Set<Integer>> rules ) {
		List<List<Integer>> orderedUpdates = updates.stream()
				.map( ArrayList::new )
				.collect( Collectors.toList() ); // mutable collection

		for ( List<Integer> update : orderedUpdates ) {
			for ( int pointerA = 0; pointerA < update.size() - 1; pointerA++ ) {
				int currentPage = update.get( pointerA );
				Set<Integer> beforePages = rules.get( currentPage );

				if ( beforePages != null ) {
					for ( int pointerB = pointerA + 1; pointerB < update.size(); pointerB++ ) {
						int otherPage = update.get( pointerB );

						if ( beforePages.contains( otherPage ) ) {
							update.add( pointerA, update.remove( pointerB ) );
							pointerA--;
							break;
						}
					}
				}
			}
		}
		return orderedUpdates;
	}
}
