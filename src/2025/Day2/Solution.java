package Day2;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Stream;


public class Solution {

	record Range( long start, long end ) {}

	public static void main( String[] args ) throws IOException {

		final List<Range> ranges = Files.lines( Paths.get( "src/2025/Day2/input.txt" ) )
				.flatMap( line -> Stream.of( line.split( "," ) ) )
				.map( range -> range.split( "-" ) )
				.map( range -> new Range( Long.parseLong( range[0] ), Long.parseLong( range[1] ) ) )
				.toList();

		long sumOfInvalidIdsPartA = 0L;
		long sumOfInvalidIdsPartB = 0L;

		for ( final Range range : ranges ) {
			for ( long id = range.start(); id <= range.end(); id++ ) {
				final String stringId = String.valueOf( id );

				if ( !isValidIdPartA( stringId ) ) {
					sumOfInvalidIdsPartA += id;
				}

				if ( !isValidIdPartB( stringId ) ) {
					sumOfInvalidIdsPartB += id;
				}

			}
		}
		System.out.printf( "Part A: %d%n", sumOfInvalidIdsPartA );
		System.out.printf( "Part B: %d%n", sumOfInvalidIdsPartB );
	}

	private static boolean isValidIdPartA( final String id ) {
		if ( id.length() % 2 != 0 ) {
			return true;
		}
		return !chunksAreEqual( id, id.length() / 2 );
	}

	private static boolean isValidIdPartB( final String id ) {
		final int halfLength = id.length() / 2;
		for ( int chunkSize = 1; chunkSize <= halfLength; chunkSize++ ) {
			if ( chunksAreEqual( id, chunkSize ) ) {
				return false;
			}
		}
		return true;
	}

	private static boolean chunksAreEqual( final String id, final int chunkSize ) {
		if ( id.length() % chunkSize != 0 ) {
			return false;
		}
		final List<String> chunks = chunkId( id, chunkSize );
		return new HashSet<>( chunks ).size() == 1;
	}

	private static List<String> chunkId( final String id, final int chunkSize ) {
		List<String> chunks = new ArrayList<>();
		for ( int i = 0; i < id.length(); i += chunkSize ) {
			chunks.add( id.substring( i, Math.min( i + chunkSize, id.length() ) ) );
		}
		return chunks;
	}

}
