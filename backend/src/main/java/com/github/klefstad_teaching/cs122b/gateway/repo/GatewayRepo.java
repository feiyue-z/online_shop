package com.github.klefstad_teaching.cs122b.gateway.repo;

import com.github.klefstad_teaching.cs122b.gateway.model.GatewayRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

import java.sql.Timestamp;
import java.sql.Types;
import java.util.List;

@Component
public class GatewayRepo {
    private final NamedParameterJdbcTemplate template;

    @Autowired
    public GatewayRepo(NamedParameterJdbcTemplate template) {
        this.template = template;
    }

    public Mono<int[]> createInsertMono(List<GatewayRequest> requests) {
        return Mono.fromCallable(() -> insertRequests(requests));
    }

    private int[] insertRequests(List<GatewayRequest> requests) {
        MapSqlParameterSource[] arrayOfSources = createSources(requests);

        String sql =
                " INSERT INTO gateway.request (ip_address, call_time, path)" +
                " VALUES (:ip_address, :call_time, :path) ";

        return this.template.batchUpdate(sql, arrayOfSources);
    }

    private MapSqlParameterSource[] createSources(List<GatewayRequest> requests) {
        MapSqlParameterSource[] sources = new MapSqlParameterSource[requests.size()];

        for (int i = 0; i < sources.length; i++) {
            sources[i] = new MapSqlParameterSource()
                    .addValue("ip_address", requests.get(i).getIpAddress(), Types.VARCHAR)
                    .addValue("call_time", Timestamp.from(requests.get(i).getCallTime()), Types.TIMESTAMP)
                    .addValue("path", requests.get(i).getPath(), Types.VARCHAR);
        }

        return sources;
    }
}
