package Day2;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class Solution {

	public static void main(String[] args) throws IOException {
		List<String> lines = Files.readAllLines( Paths.get("src/2024/Day2/input.txt") );

		List<List<Integer>> reports = createReports( lines );

		System.out.printf( "Part A: %d%n", countSafeReports( reports, false ) );
		System.out.printf( "Part B: %d%n", countSafeReports( reports, true ) );
	}

	private static List<List<Integer>> createReports( List<String> lines ) {
		return lines.stream()
				.map( line -> Arrays.stream( line.split( "\\s+") )
						.map( Integer::parseInt )
						.toList() )
				.toList();
	}

	private static boolean areLevelsOrdered( List<Integer> report ) {
		return report.equals( report.stream().sorted().toList() )
				|| report.equals( report.stream().sorted( Collections.reverseOrder() ).toList() );
	}

	private static boolean areLevelDeltasValid( List<Integer> report ) {
		for ( int i = 1; i < report.size(); i++ ) {
			int delta = Math.abs( report.get(i) - report.get(i - 1) );
			if ( delta > 3 || delta == 0 ) {
				return false;
			}
		}
		return true;
	}

	private static boolean isReportSafe( List<Integer> report, boolean useDampener ) {
		if ( report.size() < 4 ) {
			return false;
		}

		boolean isOrdered = areLevelsOrdered( report );
		if ( !isOrdered || !areLevelDeltasValid( report ) ) {
			return useDampener && isAnyVariationSafe( createReportVariations( report ) );
		}
		return true;
	}

	private static long countSafeReports( List<List<Integer>> reports, boolean dampener ) {
		return reports.stream()
				.filter( report -> isReportSafe( report, dampener ) )
				.count();
	}

	private static List<List<Integer>> createReportVariations( List<Integer> report ) {
		List<List<Integer>> reportVariations = new ArrayList<>();
		for ( int i = 0; i < report.size(); i++ ) {
			final var variation = new ArrayList<>(report);
			variation.remove( i );
			reportVariations.add( variation );
		}
		return reportVariations;
	}

	private static boolean isAnyVariationSafe( List<List<Integer>> variations ) {
		return variations.stream()
				.anyMatch( variation -> isReportSafe( variation, false ) );
	}
}
