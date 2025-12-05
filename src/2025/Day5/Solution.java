package Day5;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

public class Solution {

	public static void main( String[] args ) throws IOException {

		final List<String> input = Files.readAllLines( Paths.get( "src/2025/Day5/input.txt" ) );
		final List<List<Long>> freshIdRanges = extractIdRanges( input );
		final List<Long> availableIds = extractAvailableIds( input );

		final long freshAvailableIdCount = countFreshAvailableIds( freshIdRanges, availableIds );

		final List<List<Long>> coveredRanges = computeFullIdRanges( freshIdRanges );
		final long totalFreshIdCount = countIdsInRanges( coveredRanges );

		System.out.printf( "Part A: %d%n", freshAvailableIdCount );
		System.out.printf( "Part B: %d%n", totalFreshIdCount );
	}

	private static long countFreshAvailableIds( final List<List<Long>> freshIdRanges, final List<Long> availableIds ) {
		return availableIds.stream()
				.filter( id -> isIdFresh( freshIdRanges, id ) )
				.count();
	}

	private static long countIdsInRanges( final List<List<Long>> idRanges ) {
		return idRanges.stream()
				.mapToLong( range -> range.get( 1 ) - range.getFirst() + 1 )
				.sum();
	}

	private static boolean isIdFresh( final List<List<Long>> freshIdRanges, final Long id ) {
		return freshIdRanges.stream()
				.anyMatch( range -> id >= range.getFirst() && id <= range.get( 1 ) );
	}

	private static List<List<Long>> computeFullIdRanges( final List<List<Long>> idRanges ) {
		List<List<Long>> computedRanges = new ArrayList<>();

		final List<List<Long>> sortedRanges = idRanges.stream()
				.map( range -> (List<Long>) new ArrayList<>( range ) )
				.sorted( Comparator.comparingLong( List::getFirst ) )
				.toList();

		List<Long> currentRange = sortedRanges.getFirst();
		for ( int i = 1; i < sortedRanges.size(); i++ ) {
			List<Long> nextRange = sortedRanges.get( i );

			final long currentEnd = currentRange.get( 1 );
			final long nextStart = nextRange.getFirst();
			final long nextEnd = nextRange.get( 1 );

			if ( nextStart <= currentEnd ) {
				// Overlapping — extend end if bigger
				currentRange.set( 1, Math.max( currentEnd, nextEnd ) );
			} else {
				// No overlap — new range
				computedRanges.add( currentRange );
				currentRange = nextRange;
			}
		}
		computedRanges.add( currentRange );
		return computedRanges;
	}

	private static List<List<Long>> extractIdRanges( final List<String> lines ) {
		return lines.stream()
				.filter( line -> line.contains( "-" ) )
				.map( line -> Arrays.stream( line.split( "-" ) ).map( Long::parseLong ).toList() )
				.toList();
	}

	private static List<Long> extractAvailableIds( final List<String> lines ) {
		return lines.stream()
				.filter( line -> !line.isEmpty() && !line.contains( "-" ) )
				.map( Long::parseLong )
				.toList();
	}
}
